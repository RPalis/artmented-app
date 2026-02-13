const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET single artwork
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, ar.name as artist_name, ar.profile_image_url as artist_image
      FROM artworks a
      JOIN artists ar ON a.artist_id = ar.id
      WHERE a.id = $1
    `, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
});

// POST analytics event
router.post('/:id/analytics', async (req, res) => {
  try {
    const { event_type, session_id } = req.body;
    
    await pool.query(
      `INSERT INTO analytics (artwork_id, event_type, session_id, user_agent, created_at) 
       VALUES ($1, $2, $3, $4, NOW())`,
      [req.params.id, event_type, session_id, req.headers['user-agent']]
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    res.status(500).json({ error: 'Failed to track event' });
  }
});

module.exports = router;
