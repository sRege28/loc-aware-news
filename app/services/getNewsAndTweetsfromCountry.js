var NewsModel = require("../models/news_model");
var Tweets = require("../models/twitter_model");
var respObj = [];

var getNews = function getNews(req,res)
{
   var country = JSON.parse(req.query.geometry);

   NewsModel.find(
	 { coord: { $geoWithin:
		{ $geometry: country}}},function(err, docs){

			if(err)
				getTweets(res,err,null);
			else
			{
			  getTweets(res, null, docs);
			}

		});
};

var getTweets = function getTweets(res, err, news)
{
   if(err)
     res.send(err,null);
   else
    {
      var newsAndTweets=[];
      news.forEach(function(article, i)
	   {  
		  var obj = {};
		  console.log(article.id);
		  Tweets.find({news_article_ref: {$eq : article.id}}).exec(function(err,data)
						{
						  if(err) res.send(err);
						  else
						{
						  obj.article = article;
						  obj.tweets = data;
						  respObj.push(obj);
						  obj = {};
						  console.log(data);
						  if(i == news.length-1){
							  res.send(respObj);
						  }
						}});
	   });
   }
};

module.exports ={

	getNews : getNews

}
