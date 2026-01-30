const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET all artworks
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id, 
        a.title, 
        a.description, 
        a.image_url, 
        a.ar_model_url,
        a.price,
        a.created_at,
        ar.id as artist_id,
        ar.name as artist_name
      FROM artworks a
      JOIN artists ar ON a.artist_id = ar.id
      ORDER BY a.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

// GET single artwork
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        a.*,
        ar.name as artist_name,
        ar.bio as artist_bio,
        ar.profile_image_url as artist_profile_image
      FROM artworks a
      JOIN artists ar ON a.artist_id = ar.id
      WHERE a.id = $1`,
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
});

module.exports = router;

