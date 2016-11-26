var mongoose = require('mongoose');
var db = require("../../config/db");
/*
mongoose.connect(db.url, function(err)
                 {
                   if(err)
                    {
                      console.log(err);
                    }
                 });
                 */
//mongodb://localhost/news-sm
//mongodb://admin:group13@ds145677.mlab.com:45677/newsdb

mongoose.connect('mongodb://localhost/news-sm', function(err)
                 {
                   if(err)
                    {
                      console.log(err);
                    }
                 });

var Schema = mongoose.Schema;

//var locnSchema = new Schema({name: String, coordinates:[Number]});

var newsSchema = new Schema({

  url: String,
  title: String,
  published: Date,
  domain_rank: Number,
  text: String,
  tags: [String],
  locn: {type: Array, default:[]},
  coord: {type: Array, default:[]}
 },{collection: "News"});

newsSchema.index({ "coord" : "2dsphere" });

module.exports = mongoose.model('NewsModel',newsSchema);


