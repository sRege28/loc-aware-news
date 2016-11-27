var NewsModel = require("../models/news_model.js");
var API = require("./api_call.js");
var getGeocode = require("./location.js");


function getAllNewsArticles()
{
   NewsModel.find({}, function(err,data)
                {
                   if(err)
                    {
                      console.log(err);
                    }
                  else
                    {
                      data.forEach(function(oneArticle)
                                   {
                                      var locns = oneArticle.locn;
                                      //console.log("Locations array: "+oneArticle.uuid);
                                      getGeocode(locns,function(err,geodata)
                                                 {
                                                   if(err)
                                                    {
                                                      console.log("Cannot get co-ordinates in testlocn:24"+ err);
                                                    }
                                                   else
                                                    {
                                                      console.log("Done");
                                                      oneArticle.update({$set: {"coord": geodata}},null, function(err, numAff, raw)
                                                                        {
                                                                         if(err)
                                                                            {
                                                                              console.log(err);
                                                                            }
                                                                         else
                                                                            {
                                                                              console.log("Done");
                                                                            }
                                                                        });


                                                    }

                                                 });
                                   });
                   }

                });
}

getAllNewsArticles();


//findNews();


