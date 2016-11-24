var http = require("http");
var unirest = require("unirest");

module.exports= function getNews(callback)
      {
        unirest.get("https://webhose.io/search?token=41e87151-5f04-4c19-b009-e741af4db81d&format=json&q=language%3A(english)%20site%3Acnn.com%20(site_type%3Anews)")
        .header("Accept", "text/plain")
        .end(function (result)
        {
            console.log(result.status);

            if(result.error)
            {
              callback(result.error, null);
            }
            else
            {
              callback(null, result.body);
            }
        });
      }


