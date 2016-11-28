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
		newsAsJson.forEach(function(post){
			ents = post.entities;
			var locns = [];

			var Article = new NewsModel({
				url:     post.url,
				title:   post.title,
				published: post.thread.published,
				domain_rank: post.thread.domain_rank,
				text:       post.text,
			});

			ents.locations.forEach(function(l){
				Article.locn.push(l.name);
			});

			Article.save(function(err, data){
				if(err)
				{
					console.log(err);
				}

			});
		
		});
		getLocationForNews();
	}
};

var getNews = function getNews()
{
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
{
	NewsModel.find({}, function(err,data){
		if(err)
		{
			console.log(err);
		}
		else
		{
			data.forEach(function(oneArticle){
				var locns = oneArticle.locn;
				getLocation(locns,function(err,geodata){
					if(err)
					{
					  console.log("Cannot get co-ordinates in testlocn:24"+ err);
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

 	var len = arr.length;
 	var json_obj = new Array(len)

 	for (var i = 0; i < len; i++) {
 		str = Get("https://maps.googleapis.com/maps/api/geocode/json?address="+ arr[i] + "&key=AIzaSyCd6c7XfQB5KcKcOqhaYVUzaaH0UZzsBi4")
        //&key=AIzaSyBscboAr0OLaQMwqtlKXCUBPLdB-fp4pw4

    	json_obj[i] = JSON.parse(str);
	}

	var coordinates = getBestCoordinates(json_obj);
 	if(coordinates instanceof Error) {
 		var err = coordinates;
 		callback(err,null);
 	}
 	else {
 		callback(null,coordinates);
 	}
}

var getBestCoordinates = function getBestCoordinates(json) {

 	var len = json.length;
 	var isCountry;
 	var index = -1;

 	for (var i = 0; i < len; i++) {
 		var x = json[i];
        if(x.results[0] === undefined || x.results[0]=== null)
        {
          // Cannot parse the field for some reason
          console.log("blah error! %j", x);
          continue;
        }
 		var type = x.results[0].types[0];
        if(type === undefined || type === null) {
 			continue;
 		}
        else if(type == "country") {
 			isCountry = true;
 			index = i;
 		}
 		else {
 			isCountry = false;
 			index = i;
 			break;
 		}
	}
	if(isCountry === undefined || isCountry === null) {
		return new Error('bad request');
	}

	var lat = json[index].results[0].geometry.location.lat;
	var lng = json[index].results[0].geometry.location.lng;
	var acom = json[index].results[0].address_components;
	var clen = acom.length;
	var country = "";
	for (var i = 0; i < clen; i++) {
		var a = acom[i];
		if(a.types[0]=="country") {
			country = a.long_name;
		}
	}
	console.log("Country is " + country);
	//console.log("Geocoded co-ordinates best reult: "+json[index].results[0].formatted_address);
	var obj = {"country":country,"coordinates":[lng,lat]};
	return obj;
 }

module.exports = {
	
	getNews : getNews
	
};




