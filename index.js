const Twit = require('twit');

// Load API keys and tokens from environment variables
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Create a new Twit instance
const T = new Twit({
  consumer_key: API_KEY,
  consumer_secret: API_SECRET,
  bearer_token: BEARER_TOKEN,
});

// Track the "ESTIAM" hashtag in real-time
const stream = T.stream('statuses/filter', { track: 'ESTIAM' });

