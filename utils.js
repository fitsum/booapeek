import { createRequire } from 'module'
const require = createRequire( import.meta.url )
const Twitter = require( 'twitter' )

const client = new Twitter( {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
} )

// search tweets and page through results
const searchTweets = function ( params ) {
  client.get( 'search/tweets', params, function ( error, tweets, response ) {
    console.log( tweets.statuses )
    if ( error ) {
      console.log( 'error:', error )
      return
    }
    const nextResults = tweets.search_metadata.next_results
    params.max_id = new URLSearchParams( nextResults ).get( 'max_id' )
    // console.log("params:", params);
    if ( params.max_id !== null ) {
      searchTweets( params )
    }
  } )
}

// get followers
const getUserFollowers = function ( params ) {
  client.get( 'followers/list', params, function ( error, tweets, response ) {
    if ( error ) {
      console.log( 'error:', error )
      return
    }
    const users = JSON.parse( response.body ).users
    const nextCursor = JSON.parse( response.body ).nextCursor
    if ( users ) {
      console.log( users )
      users.forEach( ( user ) => {
      // do stuff
      } )
      if ( nextCursor !== 0 ) {
        params.cursor = nextCursor
        getUserFollowers( params )
      }
    }
  } )
}

// get last 7 days of my tweets
const getMyTweets = function ( params ) {
  client.get( 'statuses/user_timeline', params, function ( error, tweets, response ) {
    if ( !error ) {
      const out = tweets
      console.log( out )
    }
  } )
}

// show tweet data
const getTweetByID = function ( tweetID ) {
  client.get( `statuses/show/${ tweetID }`, function ( error, tweet, response ) {
    if ( !error ) {
      const out = tweet
      console.log( out )
    }
  } )
}

// remove tweet by ID
const destroyMyTweet = function ( id ) {
  client.post( `statuses/destroy/${ id }`, function ( error, tweet, response ) {
    if ( !error ) { console.log( `success deleting ID: ${ id }` ); return }
    console.log( error )
  } )
}

// post tweet
const postMyTweet = function ( tweet, halflife ) {
  client.post( 'statuses/update', { status: `${ tweet }` }, function ( error, tweet, response ) {
    if ( error ) { console.log( 'Failed posting:', error ); return }
    console.log( `success posting ID: ${ tweet.id_str }` )
    // if halflife"s defined, delete tweet in ${halflife} ms
    if ( typeof halflife !== 'undefined' ) {
      setTimeout( function () {
        destroyMyTweet( `${ tweet.id_str }` )
      }, halflife )
    }
  } )
}

export {
  searchTweets,
  getUserFollowers,
  getMyTweets,
  getTweetByID,
  postMyTweet
}
