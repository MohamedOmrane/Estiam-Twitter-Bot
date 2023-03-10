const Twit = require('twit');

// Load API keys and tokens from environment variables
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Create a new Twit instance
const T = new Twit({
    consumer_key: API_KEY,
    consumer_secret: API_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET,
  });
// Track the "ESTIAM" hashtag in real-time
const stream = T.stream('statuses/filter', { track: 'ESTIAM' });

// Every time a new tweet is posted with the "ESTIAM" hashtags
stream.on('tweet', (tweet) => {
        // Like the tweet
    T.post('favorites/create', { id: tweet.id_str }, (err, data, response) => {
      console.log(`Liked tweet with ID ${tweet.id_str}`);
    });
  
    // Retweet the tweet
    T.post(`statuses/retweet/${tweet.id_str}`, (err, data, response) => {
      console.log(`Retweeted tweet with ID ${tweet.id_str}`);
    });
  
    // Follow the user who posted the tweet, if they have more than 100 followers
    T.get('users/lookup', { user_id: tweet.user.id_str }, (err, data, response) => {
      const user = data[0];
      if (user.followers_count > 100) {
        T.post('friendships/create', { user_id: user.id_str }, (err, data, response) => {
          console.log(`Followed user with ID ${user.id_str}`);
        });
      }
    });
  });