import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [sessionId] = useState(() => crypto.randomUUID());

  return (
    <AppContext.Provider
      value={{
        artists,
        setArtists,
        selectedArtist,
        setSelectedArtist,
        selectedArtwork,
        setSelectedArtwork,
        sessionId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
