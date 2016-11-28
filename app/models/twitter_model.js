var mongoose = require('mongoose');
var NewsModel = require("./news_model");

var Schema = mongoose.Schema;

var twitterSchema = new Schema({

  created:Date,
  text:String,
  user_followers_count:Number,
  user_friends_count:Number,
  retweet_count:Number,
  favorite_count: Number,
  news_article_ref: {type:Schema.Types.ObjectId, ref: 'NewsModel'}
 },{collection: "Twitter"});

module.exports = mongoose.model('TwitterModel',twitterSchema);