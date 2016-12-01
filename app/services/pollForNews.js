var http = require("http");
var unirest = require("unirest");
var NewsModel = require("../models/news_model");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var saveData = function (err,data)
{
	var newsAsJson;
	if(err)
	{
		console.log("API Error:"+err);
	}
	else
	{
		newsAsJson = data.posts;
		newsAsJson.forEach(function(post, i){
			ents = post.entities;
			var locns = [];

			var Article = new NewsModel({
				url:     post.url,
				title:   post.title,
				published: post.thread.published,
				domain_rank: post.thread.domain_rank,
				text:       post.text
			});

			ents.locations.forEach(function(l){
				Article.locn.push(l.name);
			});

			Article.save(function(err, data){
				if(err)
				{
					console.log(err);
				}
                else if( i == newsAsJson.length-1)
                    {
                        getLocationForNews();
                    }
			});

		});

	}
};

var getNews = function getNews()
{   console.log('Getting news');
	unirest.get("https://webhose.io/search?token=41e87151-5f04-4c19-b009-e741af4db81d&format=json&q=language%3A(english)%20site%3Acnn.com%20(site_type%3Anews)")
	.header("Accept", "text/plain").end(function (result)
	{
		console.log(result.status);
		if(result.error)
		{
			saveData(result.error, null);
		}
		else
		{
			saveData(null, result.body);
		}
	});
};

var getLocationForNews = function getLocationForNews()
{   console.log('Get location for news');
	NewsModel.find({}, function(err,data){
		if(err)
		{
			console.log(err);
		}
		else
		{   console.log(data.length+" documents in db");
			data.forEach(function(oneArticle){
				var locns = oneArticle.locn;
				getLocation(locns,function(err,geodata){
					if(err)
					{
                      console.log(err+" -Removing this document");
                      oneArticle.remove({},function(err)
                                        {
                                          console.log(err);
                                        })
					}
					else
					{
						var coor = geodata.coordinates;
						var country = geodata.country;
						console.log("Done");
						oneArticle.update({$set: {"coord": coor,"country":country}},null, function(err, numAff, raw){
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
};

function Get(yourUrl){
	var Httpreq = new XMLHttpRequest(); // a new request
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;
}

var getLocation = function getLocation(arr,callback){

 	console.log("Getting location");
	var len = arr.length;
 	var json_obj = new Array(len);
	var apikey = "AIzaSyCd6c7XfQB5KcKcOqhaYVUzaaH0UZzsBi4";
	apikey = "AIzaSyBscboAr0OLaQMwqtlKXCUBPLdB-fp4pw4";

    var json = null;


 	for (var i = 0; i < len; i++) {
 		str = Get("https://maps.googleapis.com/maps/api/geocode/json?address="+ arr[i] + "&key=" + apikey);
    	obj = JSON.parse(str);
    	//console.log(obj.results[0]);

        if(obj.results[0] === undefined || obj.results[0]=== null) //If no results, or no type
            { continue;}
        var type = obj.results[0].types[0];
        if(type === undefined || type === null)
            { continue;}
	    else if(type == 'country')// is country
             {
               if(i==len -1) json = obj;
               else continue;
             }
        else
            {
              json = obj;
              break;                         // break at first non-country;
            }
	}

    if(json== null || json == undefined)
        {
          callback("Undefined object", null);
        }
   else{
            var lat = json.results[0].geometry.location.lat;
            var lng = json.results[0].geometry.location.lng;
            var acom = json.results[0].address_components;
            var clen = acom.length;
            var country = "";
            for (var j = 0; j < clen; j++) {
                var a = acom[j];
                if(a.types[0]=="country") {
                    country = a.long_name;
                  }
              }
        console.log("Country is " + country+" and lat lng is "+lat+" "+lng);
        var geocode = {};
        if(country == undefined || country == null || lat == undefined || lat == null || lng == undefined || lng == null)
            {
               geocode = new Error("No valid lat lng or country");
            }
        else{   geocode = {"country":country,"coordinates":[lng,lat]};
                if(geocode instanceof Error) {
                    var err = geocode;
                    callback(err,null);
                    }
                else {
                    callback(null,geocode);
                     }
            }

   }

}


module.exports = {

	getNews : getNews

};
