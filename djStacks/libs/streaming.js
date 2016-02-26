var request = require('request');
var promise = require('promise');
var twitter = require('twitter-text');

var config = {
    consumer_key:         '' // put keys here
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
};

var TwitPackage = require('twit');   // Requiring the Twit package
var T = new TwitPackage(config);     // Creating an instance of the Twit package
var filter_stream;

/* Streaming API - Real time search */
exports.startStream  = function(tag){
    filter_stream = T.stream('statuses/filter', { track: '#'+tag});

    /* When a Tweet is sent, this code will run */
    filter_stream.on('tweet', function (tweet) {
        text = tweet.text
        text = cleanText(text)
        if(text.match(/[a-z0-9]+\s*-\s*[a-z0-9]/i)){
            tweetToSong(text)
            .then(function(good){
                //console.log(good)
                tweet.text = text
                tweetQueue.push(tweet)
            }, function(bad){
                console.log(bad)
            })
        }
    });
}

function cleanText(text){
    var usernames = twitter.extractMentions(text);
    usernames.forEach(function(user){
        re = new RegExp("@"+user, "g")
        text = text.replace(re, "")
    })
    var urls = twitter.extractUrls(text);
    urls.forEach(function(url){
        re = new RegExp(url, "g")
        text = text.replace(re, "")
    })
    var hashtags = twitter.extractHashtags(text);
    hashtags.forEach(function(hashtag){
        re = new RegExp("#"+hashtag, "g")
        text = text.replace(re, "")
    })
    text = text.replace(/\s\s+/g, ' ')
    return text.trim()
}

var tweetToSong = function(tweet){
    return new promise(function(resolve, reject){
        try{
            request('http://www.google.com', function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  resolve(body)
                //console.log(body) // Show the HTML for the Google homepage.
                } else{
                  reject(err)
                }
            })
        } catch(e){
            console.log(e)
            reject(err)
        }



    })


};
