const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//Unsplash API Route
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

// Api-Ninja Quote API Route
router.get('/quote/:category', async (req, res) => {
  const category = req.params.category;

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_API_KEY
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Youtube API Route



module.exports = router;