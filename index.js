require('dotenv').config();
const t = require('./utils');

// settings
// const p = { screen_name: 'orgX3' };
const status = 'testing new function names and console messages';
const timeout = 10000;
// const searchParams = {
//  q: 'RT @fitsum'
// }

// t.searchTweets(searchParams)
// t.getUserFollowers(p);
// t.getMyTweets(p);
t.postMyTweet(status, timeout);
