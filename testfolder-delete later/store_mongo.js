var NewsModel = require("./news_model.js");
var API = require("./api_call.js");
var getGeocode = require("./location.js");

//It works!!


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
                        uuid:    post.uuid,
                        url:     post.url,
                        title:   post.title,
                        country: post.thread.country,
                        published: post.thread.published,
                        domain_rank: post.thread.domain_rank,
                        main_image: post.thread.main_image,
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











