var NewsModel = require("../models/news_model.js");

function getNewsByKeyword()
{
  var keyword = "Rege";

  NewsModel.find({ $text : { $search : keyword} },function(err, docs)
                                                                  {
                                                                    if(err)
                                                                      console.log(err);
                                                                    else
                                                                      console.log(docs);

                                                                  });

}


getNewsByKeyword();
