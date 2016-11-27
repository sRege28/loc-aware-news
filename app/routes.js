var Countries = require('./models/countries');
var NewsModel = require("./models/news_model");

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
	
	app.get('/getTrendingNews', function(req, res){

		NewsModel.find({}).sort({ published: -1 }).limit(10).exec(
			function(err, docs){
				if(err)
					res.send(err);
				else
					res.json(docs);				
		});

	});


	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

};
