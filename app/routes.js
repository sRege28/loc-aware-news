var Countries = require('./models/countries');
var NewsModel = require("./models/news_model");
var newsService = require("./services/getNewsAndTweetsfromCountry");

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	app.get('/getCountries', function(req, res) {

			Countries.find({}, function(err, nerds) {
				if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
			});
	});

	app.post('/getNewsInCountry', function(req, res) {

		NewsModel.find(
         { coord: { $geoWithin:
			{ $geometry: JSON.parse(req.query.geometry) }}},function(err, docs)
				  {
					if(err)
						res.send(err);
					else
						res.json(docs);

			});
	});

	app.get('/getNewsByKeyword', function(req, res){

		NewsModel.find({ $text : { $search : req.query.keyword} }
			,function(err, docs){
				if(err)
					res.send(err);
				else
					res.json(docs);
		});

	});

	app.get('/getNewsAndTweetsByKeyword',function(req, res)
         {
           NewsModel.find({ $text : { $search : req.query.keyword} }
			,function(err, docs){
				if(err)
					res.send(err);
				else
					{
					  newsService.getTweets(res,null,docs);
					}
             });
         });

	app.get('/getTrendingNews', function(req, res){

		NewsModel.find({}).sort({ published: -1 }).limit(10).exec(
			function(err, docs){
				if(err)
					res.send(err);
				else
					res.json(docs);
		});

	});

	app.get('/getTrendingNewsAndTweets', function(req, res){

		NewsModel.find({}).sort({ published: -1 }).limit(10).exec(
			function(err, docs){
				if(err)
					res.send(err);
				else
					newsService.getTweets(res,null,docs);
		});

	});

	app.get('/getCountryVsNewsCount', function(req, res){

		   NewsModel.find({}, function(err,data)
                {
                   if(err)
                    {
                      res.send(err);
                    }
                  else
                    {
                      var map = {};
                      data.forEach(function(oneArticle)
                                   {
                                   	  console.log(oneArticle.country);
                                      var country = oneArticle.country;
                                      if(!(country in map) && !(typeof country === 'undefined' || country === null) && !(country=='')) {
                                      	map[country] = 1;
                                      }
                                      else if((country in map) && !(typeof country === 'undefined' || country === null) && !(country=='')){
                                      	var value = map[country];
                                      	map[country] = value + 1;
                                      }
                                   });
                      console.log(map);
                      res.json(map);
                    }

                });
	});

    app.post('/getNewsAndTweetsInCountry', function(req,res)
	{
		newsService.getNews(req,res);
	});

	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

};
