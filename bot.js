const twit = require('twit');
const config = require('./config.js');
const Twitter = new twit(config);

// RETWEET BOT

const retweet = function() {
  const params = {
    q: '#generativeart',
    result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function(err, data) {

    if (!err) {
      let retweetId = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response) {
        if (response) {
          console.log('Retweeted!!!');
        }
        if (err) {
          console.log(err, 'Something went wrong while RETWEETING... Duplication likely...' + err);
        }
      });
    } else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
}

setInterval(retweet, 3600000);

retweet();

// FAVORITE BOT

// find a random tweet and 'favorite' it
var favoriteTweet = function() {
  var params = {
    q: '#generativeart, #codeart, #creativecode',
    result_type: 'recent',
    lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err, data) {

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);

    // if random tweet exists
    if (typeof randomTweet != 'undefined') {
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {
        id: randomTweet.id_str
      }, function(err, response) {
        // if there was an error while 'favorite'
        if (err) {
          console.log('CANNOT BE FAVORITE... Error' + err);
        } else {
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}

setInterval(favoriteTweet, 3600000);

favoriteTweet();


function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
