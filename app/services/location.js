var http = require("http");
var unirest = require('unirest');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function Get(yourUrl){
var Httpreq = new XMLHttpRequest(); // a new request
Httpreq.open("GET",yourUrl,false);
Httpreq.send(null);
return Httpreq.responseText;

    }

 function getLocation(arr,callback){
 	var len = arr.length;
 	var json_obj = new Array(len)
 	for (var i = 0; i < len; i++) {
 		str = Get("https://maps.googleapis.com/maps/api/geocode/json?address="+ arr[i] + "&key=AIzaSyBscboAr0OLaQMwqtlKXCUBPLdB-fp4pw4")
    	json_obj[i] = JSON.parse(str);
    	//console.log(str);
    	//console.log(json_obj[i]);
	}

	var coordinates = getBestCoordinates(json_obj);

 	if(coordinates instanceof Error) {
 		var err = coordinates;
 		callback(err,null);
 	}
 	else {
 		callback(null,coordinates);
 	}
 	//var lat = json_obj.results[0].geometry.location.lat;
 	//var lng = json_obj.results[0].geometry.location.lng;
 	//console.log(json_obj);
	//console.log("latitude : "+ lat + "\nlongitude : " + lng);

 }

 function getBestCoordinates(json) {
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
		 //console.log("Geocoded co-ordinates best reult: "+json[index].results[0].formatted_address);
		 return [lng,lat];


 }

 module.exports = getLocation;

// loc = getLocation(["california","usa","india"]);
 //console.log(loc);
 // [long,lat] eg [123.123 , 233.55]
