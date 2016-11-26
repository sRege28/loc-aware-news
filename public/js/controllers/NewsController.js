angular.module('newsApp').controller('NewsController', [ '$scope','leafletData', 'NewsService', function($scope, leafletData, NewsService) {

	$scope.countries = [];
	$scope.myInterval = 10000;
	/* $scope.thumbnailSize = 5;
	$scope.thumbnailPage = 1;
	 */
	$scope.points = [
		{
		  id:1,
		  "published": "2016-10-15T08:00:00.000+03:00",
		  "title": "Drone boat put through tests for coast patrol | News | The Times & The Sunday Times",
		  "text": "Drone boat put through tests for coast patrol Deborah Haynes, Defence Editor October 14 2016, 12:01am, The Times The BAE Systems robot drone boat can travel up to 40km from its base and could be used for surveillance around Britain’s coastline BAE Systems/Press Association \nA robot drone boat could be used as early as next year to patrol Britain’s coasts on the lookout for migrants and security threats. \nThe vessel, developed by BAE Systems, is one of 60 autonomous air, land and sea devices that are being tested by the Royal Navy this week off west Scotland and west Wales. \nAndy Wright, strategic technology director for BAE Systems, said that the Pacific Class 950 Unmanned Rigid Inflatable Boat would also be useful in the migrant crisis in the Mediterranean. \nThe vessel could be deployed off a larger ship. It has the ability to travel… \nYou are now logged out Your choice of two articles a week \nUnlock quality journalism on the topics that you decide matter most ",
		  "language": "english",
		  "locations": [
			  {
				"name": "wales",
			  }
		  ],
		  "geometry": {
				"type": "Point",
				"coordinates": [-0.117, 51.5]
			}
		},
		{
			id:2,
		  "published": "2016-10-15T08:00:00.000+03:00",
		  "title": "Time to stop moaning about England | Sport | The Times & The Sunday Times",
		  "text": "Time to stop moaning about England Matt Dickinson, Chief Sports Writer \nI don’t know how good this England team can become and, frankly, there were spells against Malta and Slovenia when I started to wonder how much I cared. You too? Even with the near certainty of qualification for the next World Cup, there was a nagging sense of “yes, but what then?” \nWhen you have followed England for long enough, endured so many frustrations, felt like binning that Keegan ’82 shirt still in your drawer on more than a few occasions, you have reasons to be a little jaded, a touch cynical when they are mediocre against Malta, laboured in… \nYou are now logged out Your choice of two articles a week \nUnlock quality journalism on the topics that you decide matter most ",
		  "locations": [
			  {
				"name": "england",
				"sentiment": "none"
			  }
			],
			"geometry": {
				"type": "Point",
				"coordinates": [-0.117, 51.5]
			},
		},
		{
			id:3,
		  "published": "2016-10-15T08:00:00.000+03:00",
		  "title": "England head coach calms club tensions | Sport | The Times & The Sunday Times",
		  "text": "England head coach calms club tensions Alex Lowe October 14 2016, 12:01am, The Times Nowell, of Exeter, was one of three players to sustain a long-term injury at England’s training camp last week Andrew Boyers/Reuters \nEddie Jones spent 45 minutes talking with Aviva Premiership directors of rugby yesterday in a bid to iron out any “misunderstandings” that had led to an escalation of tensions between England and the clubs. \nThe club-v-country row was sparked by England’s punishing training camp in Brighton last week, during which Bath’s Anthony Watson, Exeter’s Jack Nowell and Sam Jones, the uncapped Wasps flanker, sustained long-term injuries. \nThe Premiership criticised Jones, the England head coach, for the intensity of that training camp, and some clubs believed that they had been misled over how hard the players would be worked. \nJones had… \nYou are now logged out Your choice of two articles a week \nUnlock quality journalism on the topics that you decide matter most ",
		  "locations": [
			  {
				"name": "brighton",
				"sentiment": "none"
			  }
			],
			"geometry": {
				"type": "Point",
				"coordinates": [0.13, 50.8]
			},
		},
		{
			id:4,
		  "published": "2016-10-15T03:00:00.000+03:00",
		  "title": "Participants of Ministerial Talks on Syria Reached Consensus on Key Issues",
		  "text": "Participants of the international ministerial meeting on Syrian settlement, which was held earlier in the day in Swiss Lausanne, reached consensus on key issues including the necessity to restore the ceasefire, the US Secretary of State John Kerry said Saturday. ...",
		  "language": "english",
			"locations": [
			  {
				"name": "syria",
				"sentiment": "none"
			  }
			],
			"geometry": {
				"type": "Point",
				"coordinates": [36, 33]
			},
		},
		{
			id:5,
		  "published": "2016-10-16T01:44:50.068+03:00",
		  "title": "JP Hazet 4912-4/3 Camber Adjustment Tool Set for VW Golf 5, 6, Tiguan, Touran",
		  "text": "42799 , Leichlingen Seller's Notes: \nJP - Hazet 4912-4/3 Camber Adjustment Tool Set for VW Golf 5, 6, Tiguan, Touran Hazet - made in Germany - is one of the most famous and prestigious toolmakers in the world. The tools are manufactured with the latest technologies by skilled craftsmen in three factories located in the Rhine area in Germany. One of the most renowned tools produced are the socket sets. Used by many of the finest car makers and service shops as well as industrial, aircraft and marine applications, they are basically ...",
			"locations": [
			  {
				"name": "rhine",
				"sentiment": "none"
			  },
			  {
				"name": "germany",
				"sentiment": "none"
			  }
			],
			"geometry": {
				"type": "Point",
				"coordinates": [8, 46]
			},
		}
		];
		
		
	function init(){
		
	NewsService.getCountries().then(function(res) {
			if (res != null) {
			   $scope.countries = res[0].features;
			   console.log($scope.countries);
			} else {
				console.log("Error");
			}
	});

	}

	$scope.closeSearch = function(){
		$('#searchModal').modal('hide');
	}

	/* $scope.prevPage = function(){
		if ($scope.thumbnailPage > 1){
		  $scope.thumbnailPage--;
		}
		$scope.showThumbnails = $scope.points.slice(($scope.thumbnailPage-1)*$scope.thumbnailSize,$scope.thumbnailPage*$scope.thumbnailSize);
	  }
	  
	  $scope.nextPage = function(){
		if ($scope.thumbnailPage <= Math.floor($scope.points.length/$scope.thumbnailSize)){
		  $scope.thumbnailPage++;
		}
		$scope.showThumbnails = $scope.points.slice(($scope.thumbnailPage-1)*$scope.thumbnailSize,$scope.thumbnailPage*$scope.thumbnailSize);
	}

	$scope.showThumbnails = $scope.points.slice(($scope.thumbnailPage-1)*$scope.thumbnailSize,$scope.thumbnailPage*$scope.thumbnailSize);

	 $scope.setActive = function(idx) {
		$scope.points[idx].active=true;
	  } */


	$scope.searchNews = function(keyEvent){
		if (keyEvent.which === 13){
			NewsService.getNewsBySearchKey($scope.searchKey).then(function(res) {
				if (res != null) {
				   $scope.searchRes = $scope.points; //remove later
				   $('#searchModal').modal('show');
				} else {
					$scope.searchRes = $scope.points; //remove later
					$('#searchModal').modal('show'); // remove later
					console.log("Error");
				}
			});
			$scope.searchKey = "";
		}	
	}

	init();


	$scope.getMarkers = function() {
		var markArray = {};
		var i = {
					type: 'awesomeMarker',
					icon: 'tag',
					markerColor: 'blue'
				}
		angular.forEach($scope.points, function(value, key) {
			//console.log(value);
			var cords = value.geometry.coordinates;
			var lonv = cords[0];
			var latv = cords[1];
			var id = value.id;
			markArray[id] = {lat: latv, lng:lonv, focus:true, draggable:false, loc: value.locations[0].name, msg:value.title, txt:value.text, layer:'clusterGroup', icon : i};
		});
		$scope.markers = markArray;
		
		console.log($scope.markers);
    };
	
	angular.extend($scope, {
			center: {
				lat: 40.8471,
				lng: 14.0625,
				zoom: 2
			},
			/* geojson: {
				data: $scope.countries,
				style: {
					fillColor: "white",
					weight: 2,
					opacity: 1,
					color: 'green',
					dashArray: '3',
					fillOpacity: 0.2
				}
			}, */
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
	   console.log(selectedCountry);
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
		
		NewsService.getNewsForCountry.then(function(res) {
			if (res != null) {
			   $scope.points = res;
			   console.log($scope.points);
			} else {
				console.log("Error");
			}
		});
		
    };
			
	$scope.getMarkers();
	$scope.showModal = false;
	$scope.selectedNews = {};
	
	$scope.$on("leafletDirectiveMarker.mouseover", function(event, args){
		
		var leafEvent = args.leafletEvent;
		console.log(leafEvent);
		leafEvent.target.bindPopup(leafEvent.target.options.msg + " news");
		leafEvent.target.openPopup();
	});
	
	$scope.$on("leafletDirectiveMarker.mouseout", function(event, args){
		
		var leafEvent = args.leafletEvent;
		leafEvent.target.closePopup();
	});
	
	$scope.$on("leafletDirectiveMarker.click", function(event, args){
		
		var leafEvent = args.leafletEvent;
		$scope.selectedNews = leafEvent.target.options;
		$('#newsModal').modal('show');
		
	});
	
	$scope.closeModal = function(){
		$('#newsModal').modal('hide');
	}

}]);