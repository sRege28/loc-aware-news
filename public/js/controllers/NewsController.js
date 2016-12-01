angular.module('newsApp').controller('NewsController', [ '$scope','leafletData', 'NewsService', function($scope, leafletData, NewsService) {

	$scope.countries = [];
	$scope.myInterval = 6000;
	$scope.points = [];
	$scope.showModal = false;
	$scope.selectedNews = {};
	$scope.searchRes = [];
	$scope.searchKey = "";
		
	function init(){
		NewsService.getCountries().then(function(res) {
				if (res != null) {
				   $scope.countries = res[0].features;
				} else {
					console.log("Error");
				}
		});
		
		NewsService.getTrendingNews().then(function(res) {
				if (res != null) {
				   $scope.trending = res;
				   console.log("Trending:");
				   console.log(res);
				} else {
					console.log("Error trending news");
				}
		});	
	}

	init();
	
	$scope.closeModal = function(){
		$('#newsModal').modal('hide');
	}
	
	$scope.closeSearch = function(){
		$scope.searchKey = "";
		$scope.searchRes = [];
		$('#searchModal').modal('hide');
	}

	$scope.searchNews = function(keyEvent){
		if (keyEvent.which === 13){
			NewsService.getNewsBySearchKey($scope.searchKey).then(function(res) {
				if (res != null) {
				   $scope.searchRes = res;
				   console.log("Search:");
				   console.log(res);
				   $('#searchModal').modal('show');
				} else {
					 console.log("Error");
				}
			});	
		}	
	}

	$scope.getMarkers = function() {
		var markArray = {};
		var i = {
					type: 'awesomeMarker',
					icon: 'tag',
					markerColor: 'blue'
				}
		angular.forEach($scope.points, function(value, key) {
			var cords = value.coord;
			var lonv = cords[0];
			var latv = cords[1];
			var id = value._id;
			markArray[id] = {lat: latv, lng:lonv, focus:true, draggable:false, loc: value.locn[0], title:value.title, text:value.text,
				layer:'clusterGroup', newsid: id, icon : i};
		});
		$scope.markers = markArray;
    };
	
	angular.extend($scope, {
		center: {
			lat: 40.8471,
			lng: 14.0625,
			zoom: 2
		},
		defaults: {
			tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
			zoomControlPosition: 'topright',
			tileLayerOptions: {
				opacity: 0.9,
				detectRetina: true,
				reuseTiles: true,
			},
			scrollWheelZoom: false
		},
		markers: {	},
		events: {},
		layers: {
				baselayers: {
					 osm: {
						name: 'OpenStreetMap',
						type: 'xyz',
						url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
						layerOptions: {
							subdomains: ['a', 'b', 'c'],
							attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
							continuousWorld: true
						}
					}
				},
				overlays: {
					clusterGroup: {
						name: 'clusterGroup',
						type: 'markercluster',
						visible: true
					}
				}
			}
    });
	
	$scope.centerMap = function() {
        $scope.center = {lat: $scope.selectedRegion.lat, lng: $scope.selectedRegion.lng, zoom: 8};
    };
	
	$scope.selectCountry = function(selectedCountry) {
		
		leafletData.getMap().then(function(map) {
			var latlngs = [];
			if(selectedCountry.geometry.type == "Polygon"){
				for (var i in selectedCountry.geometry.coordinates) {
					var coord = selectedCountry.geometry.coordinates[i];
					for (var j in coord) {
						var points = coord[j];
							latlngs.push(L.GeoJSON.coordsToLatLng(points));
					}
				} 
			}
			else {
				for (var i in selectedCountry.geometry.coordinates) {
					var coord = selectedCountry.geometry.coordinates[i];
					for (var j in coord) {
						var points = coord[j];
						for (var k in points)
							latlngs.push(L.GeoJSON.coordsToLatLng(points[k]));
					}
				} 
			}
			map.fitBounds(latlngs);
		});
		
		NewsService.getNewsForCountry(selectedCountry.geometry).then(function(res) {
			if (res != null) {
			   $scope.points = res;//.slice(1,90);
			   console.log("News for country:");
			   console.log($scope.points);
			   $scope.getMarkers();
			} else {
				console.log("Error");
			}
		});
		
    };
			
	$scope.$on("leafletDirectiveMarker.mouseover", function(event, args){
		var leafEvent = args.leafletEvent;
		leafEvent.target.bindPopup(leafEvent.target.options.title);
		leafEvent.target.openPopup();
	});
	
	$scope.$on("leafletDirectiveMarker.mouseout", function(event, args){
		var leafEvent = args.leafletEvent;
		leafEvent.target.closePopup();
	});
	
	$scope.$on("leafletDirectiveMarker.click", function(event, args){
		var leafEvent = args.leafletEvent;
		
		NewsService.getTweetsForNews(leafEvent.target.options.newsid).then(function(res) {
			if (res != null) {
			   console.log("Tweets for news:");
			   console.log(res);
			   $scope.selectedNews = leafEvent.target.options;
			   $scope.selectedNews.tweets = res;
			} else {
				console.log("Error");
			}
		});
		$('#newsModal').modal('show');
	});
	
	$scope.showTrend = function(item){
		$scope.selectedNews = item;
		$('#newsModal').modal('show');
	}

}]);