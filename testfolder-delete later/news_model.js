var mongoose = require('mongoose');
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

  uuid: String,  //rem
  url: String,
  title: String,
  country: String, //rem
  published: Date, //rem
  domain_rank: Number, //rem
  main_image: String,  //rem
  text: String,
  tags: [String],
  locn: {type: Array,default:[]},
  coord: [Number]
 },{collection: "news2"});

newsSchema.index({ "locn.coordinates" : "2dsphere" });

module.exports = mongoose.model('NewsModel',newsSchema);

/*
var NewsModel = mongoose.model('NewsModel',newsSchema);

var cnn = new NewsModel({url:"www.cnn.com", title:"CNN", country:"US"});

cnn.save(function(err, cnn){

   if (err) return console.error(err);
     console.log(cnn);

  })
*/
