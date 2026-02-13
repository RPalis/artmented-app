import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { trackEvent } from '../services/api';

export default function ARViewer({ artwork, sessionId, onBack, onShowInfo }) {
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artwork) return;

    // Track AR launch
    trackEvent(artwork.id, 'ar_launch', sessionId).catch(console.error);

    let scene, camera, renderer, model;
    let animationId;

    const init = async () => {
      try {
        // Setup scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        
        renderer = new THREE.WebGLRenderer({ 
          alpha: true, 
          antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1';
        containerRef.current.prepend(video);

        // Load 3D model
        const loader = new GLTFLoader();
        loader.load(
          artwork.model_3d_url,
          (gltf) => {
            model = gltf.scene;
            model.position.set(0, 0, -5);
            model.scale.set(1, 1, 1);
            scene.add(model);
            setLoading(false);
          },
          (progress) => {
            console.log('Loading:', (progress.loaded / progress.total) * 100);
          },
          (err) => {
            console.error('Model load error:', err);
            setError('Failed to load 3D model');
            setLoading(false);
          }
        );

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          if (model) {
            model.rotation.y += 0.005;
          }
          renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

      } catch (err) {
        console.error('AR init error:', err);
        setError('Camera access denied or not available');
        setLoading(false);
      }
    };

    init();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      }
    };
  }, [artwork, sessionId]);

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
          <p className="text-white text-xl">Loading AR Experience...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="text-center p-6">
            <p className="text-white text-xl mb-4">{error}</p>
            <button
              onClick={onBack}
              className="bg-white text-black px-6 py-3 rounded-full"
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
        <button
          onClick={onBack}
          className="bg-white bg-opacity-20 backdrop-blur-md text-white px-4 py-2 rounded-full"
        >
          ← Back
        </button>
        <button
          onClick={onShowInfo}
          className="bg-white bg-opacity-20 backdrop-blur-md text-white px-4 py-2 rounded-full"
        >
          ℹ Info
        </button>
      </div>

      {!loading && !error && (
        <div className="absolute bottom-6 left-6 right-6 text-white text-center bg-black bg-opacity-50 backdrop-blur-md p-4 rounded-lg">
          <p className="text-sm">Point camera at artwork to see AR overlay</p>
          <p className="text-xs mt-1 text-gray-300">Pinch to zoom • Drag to rotate</p>
        </div>
      )}
    </div>
  );
}
