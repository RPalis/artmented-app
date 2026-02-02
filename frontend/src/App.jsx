import { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Splash from './components/Splash';
import ArtistCarousel from './components/ArtistCarousel';
import ArtworkCarousel from './components/ArtworkCarousel';
import ARViewer from './components/ARViewer';
import ArtworkInfo from './components/ArtworkInfo';

function AppContent() {
  const [screen, setScreen] = useState('splash');
  const { selectedArtist, setSelectedArtist, selectedArtwork, setSelectedArtwork, sessionId } = useApp();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {screen === 'splash' && (
        <Splash onComplete={() => setScreen('artists')} />
      )}

      {screen === 'artists' && (
        <ArtistCarousel
          onSelectArtist={(artist) => {
            setSelectedArtist(artist);
            setScreen('artworks');
          }}
        />
      )}

      {screen === 'artworks' && selectedArtist && (
        <ArtworkCarousel
          artist={selectedArtist}
          onSelectArtwork={(artwork) => {
            setSelectedArtwork(artwork);
            setScreen('ar');
          }}
          onBack={() => setScreen('artists')}
        />
      )}

      {screen === 'ar' && selectedArtwork && (
        <>
          <ARViewer
            artwork={selectedArtwork}
            sessionId={sessionId}
            onBack={() => setScreen('artworks')}
            onShowInfo={() => setShowInfo(true)}
          />
          {showInfo && (
            <ArtworkInfo
              artwork={selectedArtwork}
              onClose={() => setShowInfo(false)}
            />
          )}
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
