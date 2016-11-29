var Countries = require('./models/countries');
var NewsModel = require("./models/news_model");
var newsService = require("./services/getNewsAndTweetsfromCountry");
var TwitterModel = require("./models/twitter_model");

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

	app.get('/getCountryVsRetweets', function(req, res){

		TwitterModel.find({}, function(err,data)
                {
                	console.log("in here");
                   if(err)
                    {
                      res.send(err);
                    }
                  else
                    {
                      var map = {};
                      var count = {};
                      var ress = {};
                      data.forEach(function(oneTweet,i)
                                   {
                                   	 var news_obj_id = oneTweet.news_article_ref;
                                   	 var retweet_count = oneTweet.retweet_count;
                                   	 map = {};
                                   	 count = {};
                                   	 NewsModel.findById(news_obj_id,function(error, news_article) 
                                   	 { 
                                   	 	if(err)
					                    {
					                      console.log(err);
					                    }
					                  else
					                    {
                                   	 	var country = news_article.country;
                                        //console.log(retweet_count);
                                   	 	//console.log(country);
                                   	 	if(!(map.hasOwnProperty(country)) && !(typeof country === 'undefined' || country === null) && !(country=='')) {
                                   	 		//console.log("in first");
                                      	    map[country] = retweet_count;
                                      	    count[country] = 1;
                                        }
                                        else if((map.hasOwnProperty(country)) && !(typeof country === 'undefined' || country === null) && !(country=='')) {
                                        	//console.log("in second");
                                       	    var value = map[country];
                                       	    var cnt = count[country];
                                        	map[country] = value + retweet_count;
                                        	count[country] = cnt + 1;
                                        }
                                    	}
                                    	if(i==data.length-1) {
                                    		for (var key in map) {
											  if (map.hasOwnProperty(key)) {
											    ress[key] = parseInt(map[key]/count[key], 10);    
											  }
											}
											//console.log(ress);
											//console.log(map);
											res.json(ress);
                                    	}
                                     });   
                                   	 
                                   });
                    }

                });	

	});

	app.get('/getPopularNews', function(req, res){

		NewsModel.find({}, function(err,data)
                {
                  console.log("in here");
                   if(err)
                    {
                      res.send(err);
                    }
                  else
                    {
                      var map = {};
                      data.forEach(function(one_article,i)
                      {
                        var id = one_article.id;
                        var title = one_article.title;
                        var max = 0;
                        TwitterModel.find({news_article_ref: {$eq : id}},function(error, tweets) 
                        { 
                              if(err)
                              {
                                console.log(err);
                              }
                            else
                              {
                                   tweets.forEach(function(one_tweet,j)
                                   {
                                      var retweet_count = one_tweet.retweet_count;
                                      var favorite_count = one_tweet.favorite_count;
                                      var total = retweet_count + favorite_count;
                                      //console.log(total);
                                      if(total>max) {
                                        max = total;
                                      }
                                      if(j==tweets.length-1) 
                                      {
                                        map[title] = max;
                                      }

                                    });
                                   if(i==data.length-1) {
                                    res.json(map);
                                   }
                              } 
                         });       
                       });
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
