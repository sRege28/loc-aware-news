var NewsModel = require("../models/news_model");
//var NewsModel = require("../models/news_model");
var API = require("./api_call");
var getGeocode = require("./location");

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
                                                       console.log(err+" -Removing this document");
                                                       oneArticle.remove({},function(err)
                                                        {
                                                         if(err)
                                                         console.log(err);
                                                        });
                                                    }
                                                   else
                                                    {
                                                      var coor = geodata.coordinates;
                                                      var country = geodata.country;
                                                      console.log("Done");
                                                      oneArticle.update({$set: {"coord": coor,"country":country}},null, function(err, numAff, raw)
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


