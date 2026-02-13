import { useEffect, useState } from 'react';
import { fetchArtists } from '../services/api';

export default function ArtistCarousel({ onSelectArtist }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtists()
      .then((res) => {
        setArtists(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading artists:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading artists...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-12">
      <h2 className="text-4xl font-light mb-8 tracking-wide">Featured Artists</h2>
      <div className="flex overflow-x-scroll space-x-6 pb-8 scrollbar-hide">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-shrink-0 w-80 cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => onSelectArtist(artist)}
          >
            <div className="relative overflow-hidden rounded-lg mb-4 h-96 bg-gray-800">
              <img
                src={artist.profile_image_url}
                alt={artist.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600?text=Artist';
                }}
              />
            </div>
            <h3 className="text-2xl font-medium mb-3">{artist.name}</h3>
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors w-full">
              View AR Works
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}