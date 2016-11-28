var NewsModel = require("../models/news_model");
var TwitterModel = require("../models/twitter_model");
var searchTwitter = require("./twitter.js");

function storeTwitterData()
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
						  //console.log(title);
						  //console.log(objId);
						  if(title){
						  setTimeout(searchTwitter(title,function(err,tweets)
							{
							   if(err)
								{
								  console.log(err);
								}
							  else
								{
									if(tweets){
									tweets.forEach(
														 function(tweet)
														 {
														   
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



															Tweet.save(function(err, data)
																		{
																		if(err)
																		 {
																			console.log(err);
																		 }
																		else
																		 {
																			console.log("Done");
																		 }
																		});

													});
									}
								}
							})
						  ,1000);
					  }

					   });
	   }

	});
}

storeTwitterData();