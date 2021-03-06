var mongoose = require('mongoose');
var NewsModel = require("./news_model.js");
var Schema = mongoose.Schema;
var db = require("../../config/db")

var twitterSchema = new Schema({

  created:Date,
  text:String,
  user_followers_count:Number,
  user_friends_count:Number,
  retweet_count:Number,
  favorite_count: Number,
  news_article_ref: {type:Schema.Types.ObjectId, ref: 'NewsModel'}
 },{collection: db.twitter_col});

module.exports = mongoose.model('TwitterModel',twitterSchema);
