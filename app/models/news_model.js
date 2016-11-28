var mongoose = require('mongoose');
var db = require("../../config/db");
//mongoose.connect("mongodb://localhost/test", function(err)
mongoose.connect(db.url, function(err)
                 {
                   if(err)
                    {
                      console.log(err);
                    }
                 });

var Schema = mongoose.Schema;
//mongoose.connect('mongodb://admin:group13@ds145677.mlab.com:45677/newsdb');
//var locnSchema = new Schema({name: String, coordinates:[Number]});

var newsSchema = new Schema({
  url: String,
  title: String,
  published: Date,
  domain_rank: Number,
  text: String,
  tags: [String],
  locn: {type: Array, default:[]},
  coord: {type: Array, default:[]},
  country: String,
  social_media :{type: Array, default:[]}
 },{collection: "news"});

newsSchema.index({ "coord" : "2dsphere" });
newsSchema.index({"title" : "text"});


// the schema is useless so far
// we need to create a model using it
var News = mongoose.model('NewsModel', newsSchema);

// make this available to our users in our Node applications
module.exports = News;

