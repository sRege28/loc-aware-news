var Countries = require('./models/countries');
var NewsModel = require("./models/news_model");
//var newsService = require("./services/getNewsAndTweetsfromCountry");
var TwitterModel = require("./models/twitter_model");
var db = require('../config/db');

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
	
	app.get('/getNewsAndTweetsByKeyword', function(req,res)
	{
		NewsModel.aggregate([
			{
				$match: { $text: { $search: req.query.keyword } } 
			},
			{
				$lookup: {
				  from: db.twitter_col,
				  localField: '_id',
				  foreignField: 'news_article_ref',
				  as: 'tweets'
				}
			}
            ], function(err, docs){
				if(err)
					res.send(err);
				else
					res.json(docs);
		});
	});
	
	app.get('/getTweetsForNews', function(req, res) {		
				
		TwitterModel.find({		
                  news_article_ref: {$eq : req.query.newsid}},		
                  function(err, docs)		
				  {		
					if(err)		
						res.send(err);		
					else		
						res.json(docs);		
			});		
	});
	
	app.get('/getTrendingNewsAndTweets', function(req, res){

		NewsModel.aggregate([
				{
					$sort : { published: -1 } 
				},
				{
					$limit : 10 
				},
				{
					$lookup: {
					  from: db.twitter_col,
					  localField: '_id',
					  foreignField: 'news_article_ref',
					  as: 'tweets'
					}
				}
				], function(err, docs){
					if(err)
						res.send(err);
					else
						res.json(docs);
			});

	});

	
	app.get('/getAggregateFirst', function(req, res){

	    NewsModel.aggregate([
	    	{
	    		$match: {
	    			$and:[{"country": {"$exists":true,"$ne":null}},{"country": {"$exists":true,"$ne":""}}]	    		}
	    	},
	        {
	            $group: {
	                _id: '$country',  //$region is the column name in collection
	                count: {$sum: 1}
	            }
	        }

	    ], function (err, result) {
	        if (err) {
	            res.send(err);
	        } else {
	            res.json(result);
	        }
	    });
	});

	app.get('/getAggregateSecond', function(req, res){

		TwitterModel.aggregate([
               {
		            $group: {
		                _id: '$news_article_ref',  
		                mean_retweets: {$avg: "$retweet_count"}
		            }
	        	},
	        	{
	                $lookup: {
	                  from: db.news_col,
	                  localField: '_id',
	                  foreignField: '_id',
	                  as: 'news'
	                }
	                
            	},
            	{
	                	$unwind : "$news"
	            },
	            {
	            	$group: {
		                _id: '$news.country',  
		                mean_retweets: {$avg: "$mean_retweets"}
		            }
	            },
	            {
		    		$match: {
		    			$and:[{"_id": {"$exists":true,"$ne":null}},{"_id": {"$exists":true,"$ne":""}}]
		    		}
	    		}

            ], function(err, docs){
				if(err)
					res.send(err);
				else
					res.json(docs);
		});
	});

	app.get('/getAggregateThird', function(req, res){

		TwitterModel.aggregate([
               {
		            $project: {
		                _id: '$news_article_ref',  
		                score: {$sum:["$retweet_count","$favorite_count"] }
		            }
	           },
	           {
		            $group: {
		                _id: '$_id',  
		                max_score: {$max: "$score"}

	 				}
 			   },
 			   {
	                $lookup: {
	                  from: db.news_col,
	                  localField: '_id',
	                  foreignField: '_id',
	                  as: 'news'
	                }
            	},
            	{
	                	$unwind : "$news"
	            },
	            {
	            	$project: {
		                _id: '$news.title', 
		                score: '$max_score'
		            }
	            }

            ], function(err, docs){
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
