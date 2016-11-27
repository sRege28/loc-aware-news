var twitter = require('twitter'); //npm install twitter
var keyword_extractor = require("keyword-extractor"); // npm install keyword-extractor
var pos = require('pos'); // npm install pos

var config = {
  consumer_key: 'ysAleI7T1Ww9m2XzVPjaj5qRU',
  consumer_secret: 'J28QRycBLELqniO9beCmkkQf4M0W5i3ptZVxKB86wlNEkmC9n5',
  access_token_key: '1533314264-psvgsbn2SoLR0dio8BX5QgSArCpA2zAilOs5vJy',
  access_token_secret: 'ooxjAMuhjahgvr7unGiRvTx86r8NGsvdP4yw9NSKoUTOP'
};

  function searchTwitter(str1,callback) 
  {
    //console.log("in search twitter")
  var str2 = getKeywords(str1);
  var str = getNouns(str2);
  //console.log("extracted keywords from tweets")
  var client = new twitter(config);
  // pass in the search string, an options object, and a callback
  var options = {q: str, lang: 'en',count: 100,result_type:'popular'};
  client.get('search/tweets', options, function(error, tweets, response) {
  //console.log("tweets got")
   //console.log(tweets);
   //console.log(tweets);
   if(!error) {
        data = tweets.statuses;
       //console.log(data);
       console.log(typeof data)
       callback(false,data);
   }
   else {
    console.log("Error in twitter API :\n\n");
    console.log(error);
   }
   
  });
}
  function getKeywords(str) {
    var extraction_result = keyword_extractor.extract(str,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: true
 
                                                           });
    result = "";
    for (var i = 0; i < extraction_result.length; i++) {
      if(result == "") {
        result = result + extraction_result[i];
      }else {
        result = result + " OR " + extraction_result[i];
      }
      
  }
  //console.log(result);
  return result;
}

  function getNouns(str) {
    var result = "";
    var words = new pos.Lexer().lex(str);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    if(result == "" && tag == "NN") {
        result = result + word;
      }else if(result != "" && tag == "NN"){
        result = result + " OR " + word;
      }
}
//console.log(result);
return result;
  }

module.exports = searchTwitter;
  //searchTwitter("Syria: Heavy airstrikes resume on east Aleppo, activist group says - CNN.com",function fn(data){console.log(data)});
