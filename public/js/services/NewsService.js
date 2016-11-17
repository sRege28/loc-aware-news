angular.module('myApp').service('getDataSvc', ['$http', function($http){
	
	this.getNewsBySearchKey = function(searchKey){
		var myurl = "getNewsBySearchKey";
		 var promise = $http({
		        method : "GET",
		        url : myurl,
		        params: {key:searchKey}
		    }).then(function(response) {
		    	console.log(response.data);
		        return response.data;
		    });
		 
		 return promise;
	};
	
}]);