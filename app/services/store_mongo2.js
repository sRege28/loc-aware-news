var NewsModel = require("D:/news-socialmedia/app/models/news_model.js");
var API = require("./api_call.js");
var getGeocode = require("./location.js");

//It works!!


function saveData(err,data)
 {
   var newsAsJson;
   if(err)
    {
     console.log("API Error:"+err);
     callback(err, null)
    }
   else
   {
     newsAsJson = data.posts;

     newsAsJson.forEach(
             function(post)
             {
               var locns=[];
               ents = post.entities;
                ents.locations.forEach(function(l)
                                       {
                                         locns.push(l.name);
                                       });
               var Article = new NewsModel(
                    {
                        url:     post.url,
                        title:   post.title,
                        published: post.thread.published,
                        domain_rank: post.thread.domain_rank,
                        text:       post.text

                    });

                    getGeocode(locns,function(err, data)
                               {
                                 if(err)
                                {
                                  console.log(err);
                                }
                                else
                                {
                                  Article.coord = data;
                                  //console.log(Article);
                                  Article.save(function(err, data)
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
};


function execTime()
{
  var start = new Date();

  API(saveData);

  var time = new Date() - start;
  console.info(time);

}

execTime();

