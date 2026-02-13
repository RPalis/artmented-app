import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchArtists = () => api.get('/artists');
export const fetchArtistWithArtworks = (id) => api.get(`/artists/${id}`);
export const fetchArtwork = (id) => api.get(`/artworks/${id}`);
export const trackEvent = (artworkId, eventType, sessionId) =>
  api.post(`/artworks/${artworkId}/analytics`, {
    event_type: eventType,
    session_id: sessionId,
  });

export default api;
