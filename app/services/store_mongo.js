var NewsModel = require("./model/news_model");
var API = require("./api_call");
var getGeocode = require("./location");

function saveData(err,data)
 {
   var newsAsJson;
   if(err)
    {
     console.log("API Error:"+err);
    }
   else
   {
     newsAsJson = data.posts;

     newsAsJson.forEach(
             function(post)
             {
               ents = post.entities;
               var locns = [];

               //console.log(locns);
               var Article = new NewsModel(
                    {
                        url:     post.url,
                        title:   post.title,
                        published: post.thread.published,
                        domain_rank: post.thread.domain_rank,
                        text:       post.text,
                        //locn:       locns

                    });

               ents.locations.forEach(function(l)
                                       {
                                         Article.locn.push(l.name);
                                       });

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

                });

   }
};


API(saveData);











