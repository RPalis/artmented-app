sql
-- Create Artists table
CREATE TABLE IF NOT EXISTS artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  instagram_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year INTEGER,
  medium VARCHAR(100),
  thumbnail_url TEXT NOT NULL,
  marker_image_url TEXT NOT NULL,
  model_3d_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_artworks_artist_id ON artworks(artist_id);
CREATE INDEX idx_analytics_artwork_id ON analytics(artwork_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Insert sample data
INSERT INTO artists (name, bio, profile_image_url, instagram_url, website_url) VALUES
('Raquel Palis', 'Contemporary digital artist exploring the intersection of physical and digital realms', 
 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
 'https://instagram.com/_rpalis',
 'https://raquelpalis.com');

INSERT INTO artworks (artist_id, title, description, year, medium, thumbnail_url, marker_image_url, model_3d_url)
SELECT 
  id,
  'Digital Fragments',
  'An exploration of fragmented reality through augmented layers',
  2024,
  'Digital AR Installation',
  'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  'https://res.cloudinary.com/demo/image/upload/sample.jpg',
  'https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf'
FROM artists WHERE name = 'Raquel Palis';