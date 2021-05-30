require('dotenv').config();
const t = require('./twests');

// settings
// const p = { screen_name: 'orgX3' };
const status = '13 is a spleen';
const timeout = 10000;
// const searchParams = {
//  q: 'RT @fitsum'
// }

// t.searchTweets(searchParams)
// t.getUserFollowers(p);
// t.getMyTweets(p);
t.postMyTweet(status, timeout);
