const express = require('express');
const router = express.Router();

router.get('/unsplash/:topic', async (req, res) => {
  const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
  const topic = req.params.topic;

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${topic}&client_id=${unsplashAccessKey}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Unsplash API' });
  }
});

// Define routes for other APIs here!!

module.exports = router;