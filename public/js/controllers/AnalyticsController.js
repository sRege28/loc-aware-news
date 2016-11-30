google.load('visualization', '1', {
  packages: ['corechart','bar','table']
});
angular.module('newsApp').controller('AnalyticsController', [ '$scope','AnalyticsService', function($scope, AService) {

	function getDataTable(res) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Country');
		data.addColumn('number', 'Count');
		for (var key in res) {
		    if (res.hasOwnProperty(key)) {
		      var val = res[key];
		      data.addRow([key,val]);
		    }
		}
		data.sort([{column: 1,desc: true}]);
		// Set chart options
      var pie_options = {
                     'width':500,'height':400,
                     'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 16, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	}
                    };
      var bar_options ={'width': 500, 'height': 400, 
                      
                        'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 26, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	},
                        'hAxis': {'title': 'country', 'titleTextStyle': {'color': 'black', 'fontSize': 16}},
                        'vAxis': {'title': 'articles', 'titleTextStyle': {'color': 'black', 'fontSize': 16}, minValue: 0, maxValue: 100, format: '#\'%\''}
                      }
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart1'));
      chart.draw(data, pie_options);

     var chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
     chart.draw(data, bar_options);
	}

	function getDataTableRetweets(res) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Country');
		data.addColumn('number', 'Retweet Count');
		for (var key in res) {
		    if (res.hasOwnProperty(key)) {
		      var val = res[key];
		      data.addRow([key,val]);
		    }
		}
		data.sort([{column: 1,desc: true}]);
		var pie_options = {
                     'width':500,'height':400,
                     'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 26, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	}
                    };
      	var bar_options ={'width': 500, 'height': 400, 
                        
                        'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 26, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	},
                        'hAxis': {'title': 'country', 'titleTextStyle': {'color': 'black', 'fontSize': 16}},
                        'vAxis': {'title': 'retweets', 'titleTextStyle': {'color': 'black', 'fontSize': 16}}
                      }
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart3'));
      chart.draw(data, pie_options);

     var chart = new google.visualization.ColumnChart(document.getElementById('chart4'));
     chart.draw(data, bar_options);

	}

	function showPopularNews(res) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'News Title');
		data.addColumn('number', 'Score');
		for (var key in res) {
		    if (res.hasOwnProperty(key)) {
		      var val = res[key];
		      data.addRow([key,val]);
		    }
		}
		data.sort([{column: 1,desc: true}]);
		data.removeRows(20,data.getNumberOfRows()-20);
		var table = new google.visualization.Table(document.getElementById('table'));
		table.draw(data, { width: '1200', height: '290', 'count':10});
	}

	function processAggregateFirst(res) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Country');
		data.addColumn('number', 'Count');
		angular.forEach(res, function(value, key) {
			data.addRow([value._id,value.count]);
		});
		data.sort([{column: 1,desc: true}]);

		var pie_options = {
                     'width':500,'height':400,
                     'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 16, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	}
                    };
      var bar_options ={'width': 500, 'height': 400, 
                      
                        'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 26, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	},
                        'hAxis': {'title': 'country', 'titleTextStyle': {'color': 'black', 'fontSize': 16}},
                        'vAxis': {'title': 'articles', 'titleTextStyle': {'color': 'black', 'fontSize': 16}, minValue: 0, maxValue: 100, format: '#\'%\''}
                      }
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart1'));
      chart.draw(data, pie_options);

     var chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
     chart.draw(data, bar_options);
		
	}

	function processAggregateSecond(res) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Country');
		data.addColumn('number', 'Mean_Retweets');
		angular.forEach(res, function(value,key) {
			data.addRow([value._id,value.mean_retweets]);
		});
		data.sort([{column: 1,desc: true}]);
		
		var pie_options = {
                     'width':500,'height':400,
                     'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 26, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	}
                    };
      	var bar_options ={'width': 500, 'height': 400, 
                        
                        'titleTextStyle':   {
									        'color': 'black',    // any HTML string color ('red', '#cc00cc')
									        'fontName': 'Times New Roman', // i.e. 'Times New Roman'
									        'fontSize': 26, // 12, 18 whatever you want (don't specify px)
									        'bold': true,    // true or false
									        'italic': false  // true of false
									    	},
                        'hAxis': {'title': 'country', 'titleTextStyle': {'color': 'black', 'fontSize': 16}},
                        'vAxis': {'title': 'retweets', 'titleTextStyle': {'color': 'black', 'fontSize': 16}}
                      }
      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart3'));
      chart.draw(data, pie_options);

     var chart = new google.visualization.ColumnChart(document.getElementById('chart4'));
     chart.draw(data, bar_options);
	}

	function processAggregateThird(res) {
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'News Title');
		data.addColumn('number', 'Score');
		angular.forEach(res, function(value,key) {
			data.addRow([value._id,value.score]);
		});

		data.sort([{column: 1,desc: true}]);
		data.removeRows(20,data.getNumberOfRows()-20);
		var table = new google.visualization.Table(document.getElementById('table'));
		table.draw(data, { width: '1200', height: '290', 'count':10});
	}

	function init(){
		// AService.getCountryVsNewsCount().then(function(res) {
		// 		if (res != null) {
		// 		   //console.log(res);
		// 		   //var data = getDataTable(res);
		// 		   //console.log(data);

		// 		} else {
		// 			console.log("Error");
		// 		}
		// });

		// AService.getCountryVsRetweets().then(function(res) {
		// 		if (res != null) {
		// 		   console.log(res);
		// 		   //var data = getDataTableRetweets(res);
		// 		} else {
		// 			console.log("Error");
		// 		}
		// });

		// AService.getPopularNews().then(function(res) {
		// 		if (res != null) {
		// 		   console.log(res);
		// 		   var data = showPopularNews(res);
		// 		} else {
		// 			console.log("Error");
		// 		}
		// });

		AService.getAggregateFirst().then(function(res) {
				if (res != null) {
				   console.log(res);
				   var data = processAggregateFirst(res);
				} else {
					console.log("Error");
				}
		});

		AService.getAggregateSecond().then(function(res) {
				if (res != null) {
				   console.log(res);
				   var data = processAggregateSecond(res);
				} else {
					console.log("Error");
				}
		});

		AService.getAggregateThird().then(function(res) {
				if (res != null) {
				   console.log(res);
				   var data = processAggregateThird(res);
				} else {
					console.log("Error");
				}
		});
	}
	init();



}]);

/*
google.load('visualization', '1', {
  packages: ['corechart','bar']
});
*/
