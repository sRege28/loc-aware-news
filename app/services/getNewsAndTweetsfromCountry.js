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
      respObj = [];
	  news.forEach(function(article, i)
	   {
		  var obj = {};
		  Tweets.find({news_article_ref: {$eq : article.id}}).exec(function(err,data)
			{
				if(err) 
					res.send(err);
				else
				{
					obj.article = article;
				  obj.tweets = data;
				  respObj.push(obj);
				  obj = {};
				  if(i == news.length-1){
					  console.log(respObj);
					  res.send(respObj);
					}
			}});
	   });
   }
};

module.exports ={

	getNews : getNews,
	getTweets: getTweets

}
