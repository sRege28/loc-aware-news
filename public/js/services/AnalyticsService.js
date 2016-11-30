angular.module('newsApp').service('AnalyticsService', ['$http', function($http){
    
    //  this.getCountryVsNewsCount = function(){
    //      var promise = $http({
    //             method : "GET",
    //             url : "/getCountryVsNewsCount",
				// cache: true
    //         }).then(function(response) {
    //             console.log(response.data);
    //             return response.data;
    //         });
         
    //      return promise;
    // }

    // this.getCountryVsRetweets = function(){
    //      var promise = $http({
    //             method : "GET",
    //             url : "/getCountryVsRetweets",
				// cache: true
    //         }).then(function(response) {
    //             console.log(response.data);
    //             return response.data;
    //         });
         
    //      return promise;
    // }

    // this.getPopularNews = function(){
    //      var promise = $http({
    //             method : "GET",
    //             url : "/getPopularNews",
				// cache: true
    //         }).then(function(response) {
    //             console.log(response.data);
    //             return response.data;
    //         });
         
    //      return promise;
    // }

    this.getAggregateFirst = function(){
         var promise = $http({
                method : "GET",
                url : "/getAggregateFirst",
                cache: true
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
         
         return promise;
    }

    this.getAggregateSecond = function(){
         var promise = $http({
                method : "GET",
                url : "/getAggregateSecond",
                cache: true
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
         
         return promise;
    }

    this.getAggregateThird = function(){
         var promise = $http({
                method : "GET",
                url : "/getAggregateThird",
                cache: true
            }).then(function(response) {
                console.log(response.data);
                return response.data;
            });
         
         return promise;
    }

    
        
    
}]);