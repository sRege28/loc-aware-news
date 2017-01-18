angular.module('newsApp').service('AnalyticsService', ['$http', function($http){
    

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