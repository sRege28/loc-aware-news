var NewsModel = require("../models/news_model.js");
var TwitterModel = require("../models/twitter_model.js");
var twitter = require('twitter'); 
var keyword_extractor = require("keyword-extractor"); 
var pos = require('pos');

/* var config = {
  consumer_key: 'ysAleI7T1Ww9m2XzVPjaj5qRU',
  consumer_secret: 'J28QRycBLELqniO9beCmkkQf4M0W5i3ptZVxKB86wlNEkmC9n5',
  access_token_key: '1533314264-psvgsbn2SoLR0dio8BX5QgSArCpA2zAilOs5vJy',
  access_token_secret: 'ooxjAMuhjahgvr7unGiRvTx86r8NGsvdP4yw9NSKoUTOP'
}; */

var config = {
  consumer_key: 'dxFf2P0jBM4o3xhJIgsgdeJUA',
  consumer_secret: 'LDaJdYipslufe6bCIYSplyJIQfhdcwTX3vbq9DK8frb0ZSiiMv',
  access_token_key: '803477426516979712-Mws3Egi7nqmSH4ZFpTXLHBFJMIfVSxj',
  access_token_secret: 'rUm6lYrJr8ly9Yd7KAVXL7jjL01PS0lZasB5WJTWHBnXo'
};

var getNouns = function getNouns(str) {
	var result = "";
	var words = new pos.Lexer().lex(str);
	var tagger = new pos.Tagger();
	var taggedWords = tagger.tag(words);
	for (i in taggedWords) {
		var taggedWord = taggedWords[i];
		var word = taggedWord[0];
		var tag = taggedWord[1];
		if(result == "" && tag == "NN") {
			result = result + word;
		}else if(result != "" && tag == "NN"){
			result = result + " OR " + word;
		}
	}
	return result;
};

var getKeywords = function getKeywords(str) {
    var extraction_result = keyword_extractor.extract(str,{
								language:"english",
								remove_digits: true,
								return_changed_case:true,
								remove_duplicates: true
                            });
    result = "";
    for (var i = 0; i < extraction_result.length; i++) {
      if(result == "") {
        result = result + extraction_result[i];
      }else {
        result = result + " OR " + extraction_result[i];
      }
  }
  return result;
}
  
var searchTwitter = function searchTwitter(str1,callback) 
{
	var str2 = getKeywords(str1);
	var str = getNouns(str2);
	var client = new twitter(config);
	// pass in the search string, an options object, and a callback
	var options = {q: str, lang: 'en',count: 100,result_type:'popular'};
	client.get('search/tweets', options, function(error, tweets, response) {
		if(!error) {
			data = tweets.statuses;
			callback(false,data);
		}
		else {
			console.log("Error in twitter API :\n\n" + error + response);
		}
	});
};

var storeTwitterData = function storeTwitterData()
{
   NewsModel.find({}, function(err,data){
		if(err)
		{
			console.log(err);
		}
		else
		{
			data.forEach(function(oneArticle)
			{
				var title = oneArticle.title;
				var objId = oneArticle._id;

				if(title){
					searchTwitter(title,function(err,tweets){
						if(err)
						{
						  console.log(err);
						}
						else
						{
							if(tweets){
								tweets.forEach(function(tweet){
														   
									var Tweet = new TwitterModel(
									{
										created:tweet.created_at,
										text:tweet.text,
										user_followers_count:tweet.user.followers_count,
										user_friends_count:tweet.user.friends_count,
										retweet_count:tweet.retweet_count,
										favorite_count: tweet.favorite_count,
										news_article_ref: objId
									});

									Tweet.save(function(err, data){
										if(err)
										{
											console.log(err);
										}
									});
								});
							}
						}
					});
				}
			});
	   }

	});
};

module.exports = {
	
	storeTwitterData : storeTwitterData
	
};