var NewsModel = require("../models/news_model");
var TwitterModel = require("../models/twitter_model");



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

//agg();
