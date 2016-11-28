var NewsModel = require("../models/news_model");
var Tweets = require("../models/twitter_model");


function getNews(req,res,callback)
{
   var country = req.query;

   NewsModel.find(
         { coord: { $geoWithin:
			{ $geometry: country}}},function(err, docs)
				  {

					if(err)
                        callback(res,err,null);
					else
                        {
                          callback(res, null, docs);
                        }

			});
}

//news_article_ref: {$in : news._id}

function getTweets(res, err, news)
{
   if(err)
     res.send(err,null);
   else
    {
      var newsAndTweets=[];
      news.forEach(function(article)
                   {  var obj;
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
}
module.exports ={
function getNewsAndTweets(req, res)
 {

   getNews(req, res, getTweets);

 }

}
