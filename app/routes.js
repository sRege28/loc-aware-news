var Countries = require('./models/countries');

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
	
	
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});

};