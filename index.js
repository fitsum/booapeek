require( 'dotenv' ).config()
const t = require( './utils' )

const timeout = ( process.argv[ 3 ] || 30 ) * 1000
const goneBy = new Date( new Date().getTime() + timeout ).toLocaleTimeString( 'en', { timeStyle: 'short' } ) + ' EST'
const status = process.argv[ 2 ] + `\n👋 by ${ goneBy }`
// t.searchTweets(searchParams)
// t.getUserFollowers(p);
// t.getMyTweets(p);
t.postMyTweet( status, timeout )
