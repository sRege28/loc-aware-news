var NewsModel = require("../models/news_model");

module.exports = {
  getNewsByKeyword: function () {
   var keyword = "justin";

  NewsModel.find({ $text : { $search : keyword} },function(err, docs)
                                                                  {
                                                                    if(err)
                                                                      console.log(err);
                                                                    else
                                                                      console.log(docs);

                                                                  });
  }
};

