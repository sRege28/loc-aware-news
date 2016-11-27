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

	app.post('/getNewsByKeyword', function(req, res){

          function getNewsByKeyword()
            {
             var keyword = req

             NewsModel.find({ $text : { $search : keyword} },function(err, docs)
                                                                  {
                                                                    if(err)
                                                                      res.send(err);
                                                                    else
                                                                      res.send(docs);

                                                                  });

           }

 });

	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

};
