import { useEffect, useState } from 'react';
import { fetchArtistWithArtworks } from '../services/api';

export default function ArtworkCarousel({ artist, onSelectArtwork, onBack }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtistWithArtworks(artist.id)
      .then((res) => {
        setArtworks(res.data.artworks);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading artworks:', err);
        setLoading(false);
      });
  }, [artist.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading artworks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-12">
      <button
        onClick={onBack}
        className="mb-6 text-white hover:text-gray-300 text-lg"
      >
        ← Back to Artists
      </button>
      <h2 className="text-3xl font-light mb-2">{artist.name}</h2>
      <p className="text-gray-400 mb-8">AR Artworks</p>
      
      <div className="flex overflow-x-scroll space-x-6 pb-8 scrollbar-hide">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="flex-shrink-0 w-72 cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => onSelectArtwork(artwork)}
          >
            <div className="relative overflow-hidden rounded-lg mb-3 h-80 bg-gray-800">
              <img
                src={artwork.thumbnail_url}
                alt={artwork.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x500?text=Artwork';
                }}
              />
            </div>
            <h3 className="text-xl font-medium">{artwork.title}</h3>
            <p className="text-gray-400 text-sm mt-1">
              {artwork.year} • {artwork.medium}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
