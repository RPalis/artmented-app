const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Artists routes
app.use('/api/artists', require('./routes/artists'));
app.use('/api/artworks', require('./routes/artworks'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});