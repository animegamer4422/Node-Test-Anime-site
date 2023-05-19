const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(express.static('public'));  // Serve your HTML/CSS/JS files from a 'public' directory

app.get('/api/anime', async (req, res) => {
  // Make a request to the Anime API (or scrape a website) using axios and cheerio
  const searchQuery = req.query.q; // Suppose you are searching for an anime, get query from request
  const response = await axios.get(`https://api-endpoint/search?q=${searchQuery}`);
  const data = response.data;

  // Do something with the data...
  // Maybe filter it, maybe scrape additional information...

  // Send the data back to the client
  res.json(data);
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
