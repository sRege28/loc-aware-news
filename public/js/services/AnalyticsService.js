angular.module('newsApp').service('AnalyticsService', ['$http', function($http){
    
     this.getCountryVsNewsCount = function(){
         var promise = $http({
                method : "GET",
                url : "/getCountryVsNewsCount",
				cache: true
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
         
         return promise;
    }

    this.getCountryVsRetweets = function(){
         var promise = $http({
                method : "GET",
                url : "/getCountryVsRetweets",
				cache: true
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
         
         return promise;
    }

    this.getPopularNews = function(){
         var promise = $http({
                method : "GET",
                url : "/getPopularNews",
				cache: true
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
         
         return promise;
    }


    
        
    
}]);