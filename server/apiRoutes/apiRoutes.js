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
router.get('/youtube/:category', async (req, res) => {
  const category = req.params.category;
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;

  let videoCategoryId;

  switch (category) {
    case 'travel&events':
      videoCategoryId = 19; // Travel & Events
      break;
    case 'animals':
      videoCategoryId = 15; // Pets & Animals
      break;
    case 'science&technology':
      videoCategoryId = 28; // Science & Technology
      break;
    default:
      res.status(400).json({ error: 'Invalid category' });
      return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&type=video&videoCategoryId=${videoCategoryId}&key=${youtubeApiKey}`
    );
    const data = await response.json();
    const videos = data.items;
    const randomVideoIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomVideoIndex];
    res.json(randomVideo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
  }
});

module.exports = router;