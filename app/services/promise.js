var News = require("../models/news_model");
var Tweets = require("../models/twitter_model");
var Countries = require("../models/countries");
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:group13@ds145677.mlab.com:45677/newsdb', function(err)
                {
                    if(err)
                     {
                       console.log(err);
                     }
                  });

news_array =[];

function getNews()
{
  News.find({}).exec(function(err, docs)
                 {
                   if(err) console.log(err);
                   //else console.log(docs);

                 })
                 .then(function(docs)
                       {

                           let requests = docs.map((article)=>
                                                   {
                                                     return new Promise((resolve)=>
                                                                        {
                                                                           Tweets.find({news_article_ref: {$eq : article.id}}).exec(function(err, data)
                                                                                     {
                                                                                        article.tags = data;
                                                                                        news_array.push(article);
                                                                                        console.log(news_array);
;                                                                                     });
                                                                        });
                                                   });

                            //Promise.all(requests).then(() => console.log(news_array));
                        });
                         /*
                         docs.forEach(function(article)
                         {

                                   var a = Tweets.find({news_article_ref: {$eq : article.id}}).exec(function(err, data)
                                                                                     {
                                                                                        article.tags = data;
                                                                                        //console.log(article);
                                                                                        news_array.push(article);
                                                                                        //return
                                                                                     });



                         });
                         */



//console.log(news_array);

}

getNews();
