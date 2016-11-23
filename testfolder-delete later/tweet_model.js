var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/news-sm', function(err)
                 {
                   if(err)
                    {
                      console.log(err);
                    }
                 });
var Schema = mongoose
