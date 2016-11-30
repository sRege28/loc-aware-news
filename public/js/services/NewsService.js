angular.module('newsApp').service('NewsService', ['$http', function($http){
	
	 this.getNewsBySearchKey = function(searchKey){
		 var promise = $http({
		        method : "GET",
		        url : "/getNewsAndTweetsByKeyword",
		        params: {keyword:searchKey}
		    }).then(function(response) {
		        return response.data;
		    });
		 
		 return promise;
	}
	
	this.getCountries = function(){
		 var promise = $http({
		        method : "GET",
		        url : "/getCountries"
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}
	
	this.getNewsForCountry = function(geo){
		
		 var promise = $http({
		        method : "POST",
		        url : "/getNewsInCountry",
				cache: true,
				params: {geometry:geo}
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}
	
	this.getTrendingNews = function(){
		 var promise = $http({
		        method : "GET",
		        url : "/getTrendingNewsAndTweets"
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}

	this.getTweetsForNews = function(news){
		console.log(news);
		 var promise = $http({
		        method : "GET",
		        url : "/getTweetsForNews",
				params: {newsid: news}
		    }).then(function(response) {
		        return response.data;
		});
		
		return promise;
	}	
		
}]);