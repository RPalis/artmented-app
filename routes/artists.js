const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET all artists
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, bio, profile_image_url, instagram_url, website_url 
      FROM artists 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// GET single artist with artworks
router.get('/:id', async (req, res) => {
  try {
    const artistResult = await pool.query(
      'SELECT * FROM artists WHERE id = $1',
      [req.params.id]
    );
    
    if (artistResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const artworksResult = await pool.query(
      'SELECT * FROM artworks WHERE artist_id = $1 ORDER BY created_at DESC',
      [req.params.id]
    );

    res.json({
      artist: artistResult.rows[0],
      artworks: artworksResult.rows
    });
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

module.exports = router;