var NewsModel = require("../models/news_model");
var Tweets = require("../models/twitter_model");
var respObj = {};

var getNews = function getNews(req,res)
{
   var country = JSON.parse(req.query.geometry);
	console.log(country);
   NewsModel.find(
         { coord: { $geoWithin:
			{ $geometry: country}}},function(err, docs)
				  {

					if(err)
                        getTweets(res,err,null);
					else
					{
					  getTweets(res, null, docs);
					}

			});
};

//news_article_ref: {$in : news._id}

var getTweets = function getTweets(res, err, news)
{
   if(err)
     res.send(err,null);
   else
    {
      var newsAndTweets=[];
      news.forEach(function(article)
	   {  
		  var obj = {};
		  Tweets.find({news_article_ref: {$eq : article.id}}).exec(function(err,data)
						{
						  if(err) res.send(err);
						  else
						{
						  obj.article = article;
						  obj.tweets = data;
						  //collectResponse()
						}});
	   });
   }
};

var collectResponse = function collectResponse(res, err, news)
{
   if(err)
     res.send(err,null);
   else
    {
      var newsAndTweets=[];
      news.forEach(function(article)
	   {  var obj = {};
		  Tweets.find({news_article_ref: {$eq : article.id}}).exec(function(err,data)
						{
						  if(err) res.send(err);
						  else
						{
						  obj.article = article;
						  obj.tweets = data;
						  res.send(obj);
						}});
	   });
   }
};

module.exports ={

	getNews : getNews

}
