require('dotenv').config();
const t = require('./utils');

// const p = { screen_name: 'orgX3' };
const timeout = 90000;
const goneBy = new Date(new Date().getTime() + timeout).toLocaleTimeString('en', { timeStyle: 'short' }) + ' EST';
const status = `message gone by ${goneBy}`;
// t.searchTweets(searchParams)
// t.getUserFollowers(p);
// t.getMyTweets(p);
t.postMyTweet(status, timeout);
