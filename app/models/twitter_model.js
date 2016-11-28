var mongoose = require('mongoose');
var NewsModel = require("./news_model.js");
var db = require("../../config/db");
//mongoose.connect("mongodb://localhost/test", function(err)
// mongoose.connect(db.url, function(err)
//                  {
//                    if(err)
//                     {
//                       console.log("Error in twitter model : " + err);
//                     }
//                  });

console.log("successfully connected")
//mongodb://localhost/news-sm
//mongodb://admin:group13@ds145677.mlab.com:45677/newsdb

var Schema = mongoose.Schema;

var twitterSchema = new Schema({

  created:Date,
  text:String,
  user_followers_count:Number,
  user_friends_count:Number,
  retweet_count:Number,
  favorite_count: Number,
  news_article_ref: {type:Schema.Types.ObjectId, ref: 'NewsModel'}
 },{collection: "twitter"});

module.exports = mongoose.model('TwitterModel',twitterSchema);