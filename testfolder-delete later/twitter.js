var twitter = require('twitter');

var config = {
  consumer_key: 'ysAleI7T1Ww9m2XzVPjaj5qRU',
  consumer_secret: 'J28QRycBLELqniO9beCmkkQf4M0W5i3ptZVxKB86wlNEkmC9n5',
  access_token_key: '1533314264-psvgsbn2SoLR0dio8BX5QgSArCpA2zAilOs5vJy',
  access_token_secret: 'ooxjAMuhjahgvr7unGiRvTx86r8NGsvdP4yw9NSKoUTOP'
};

function searchTwitter(str) {
	// make a twitter client
	var client = new twitter(config);
	// pass in the search string, an options object, and a callback
	var options = {q: str, lang: 'en',count: 10};
	client.get('search/tweets', options, function(error, tweets, response) {
   //console.log(tweets);
   console.log(tweets);
});
}

searchTwitter("cricket sports");
