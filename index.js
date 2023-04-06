import 'dotenv/config'
import {
  postMyTweet
} from './utils.js'

const timeout = ( process.argv[ 3 ] || 30 ) * 1000
const goneBy = new Date( new Date().getTime() + timeout ).toLocaleTimeString( 'en', { timeStyle: 'short' } ) + ' EST'
const status = process.argv[ 2 ] + `\n👋 by ${ goneBy }`
postMyTweet( status, timeout )
