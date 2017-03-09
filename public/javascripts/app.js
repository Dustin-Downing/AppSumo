angular.module('sumoApp', ['ngMaterial', 'ngResource'])
	.controller('LoginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.showAdmin = false;
		$scope.isNewUser = "true";
    $scope.login = () => {
      //hide old error messages
      $scope.showError = false;
      //search for username
      $scope.user = [];
      $http.get('/users/getByName/'+$scope.username).success(function(data) {
        $scope.user = data;
        if($scope.isNewUser==="true") {
          //registering new user
          if(!$scope.user) {
            //if username wasn't found
            $http.post('/users/create', {
              'username':$scope.username
            }).success(function(data, status, headers, config) {
              console.log("creating a new users: "+$scope.username);
              $scope.user = data;
              $window.location.href = '/welcome/'+$scope.user.id;
            }).error(function(data) {
              console.log("Ops: " + data);
              $scope.showError = true;
          		$scope.errorMessage = "User couldn't be created. Please try again.";
            });
          } else {
            //if username was found
        		$scope.showError = true;
        		$scope.errorMessage = "Username already registered. Please try again.";
          }
        } else {
          //loggin in as exsisting user
          if(!!$scope.user) {
            //if username was found
            $window.location.href = '/welcome/'+$scope.user.id;
          } else {
            //if username couldn't be found
            $scope.showError = true;
        		$scope.errorMessage = "Username not found. Please try again.";
          }
          console.log("logging in as: "+$scope.username);
        }
      }).error(function() {
        console.log("Ops: could not get any data");
      });
    };
	}])
  .controller('WelcomeCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
		$scope.submit = () => {
      $http.post('/answers/create', {
        'result':$scope.result,
        'UserId':$window.userId,
        'QuestionId':$window.questionId
      }).success(function(data, status, headers, config) {
        console.log("creating a new answer: "+$scope.result);
        $window.location.href = '/welcome/'+$window.userId;
      }).error(function(data) {
        console.log("Ops: " + data);
        //TODO():add error message
      });
    }
  }])
  .controller('DashCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.options = [];
		$scope.questions = [];
		$http.get('/questions/all', {
		}).success(function(questions, status, headers, config) {
			$scope.questions = questions;
			// question.Options.forEach(function() {
			//
			// })
			$scope.questions.forEach(function(question) {
				var chartData=[];
				var options=[];
				question.Options.forEach(function(option) {
					options[option.id] = 0;
				});
				question.Answers.forEach(function(answer) {
					options[answer.result]++;
				});
				question.Options.forEach(function(option) {
					chartData.push([option.discription, options[option.id]]);
				});
				var chartFoo = function() {
					// Create the data table
					var data = new $window.google.visualization.DataTable();
					data.addColumn('string', 'Answers');
					data.addColumn('number', 'Count');
					data.addRows(chartData);
					var options = {
						title:question.question,
						legend: {position: 'none'}
					};
					// Instantiate and draw the chart
					var chart = new $window.google.visualization.PieChart(document.getElementById('chart-'+question.id));
					chart.draw(data, options);
				};
				$window.google.charts.load('current', {'packages':['corechart']});
				$window.google.charts.setOnLoadCallback(chartFoo);
			})
		}).error(function(data) {
			console.log("Ops: " + data);
		});

    $scope.makeQuestion = () => {
      //TODO(): add form validation for all fields filled
      $http.post('/questions/create', {
        'title' : $scope.title,
        'question' : $scope.questionDescription,
        'options' : $scope.options,
      }).success(function(data, status, headers, config) {
        $window.location.href = '/dashboard';
      }).error(function(data) {
        console.log("Ops: " + data);
        //TODO(): add error messgae for this screen
        // $scope.showError = true;
        // $scope.errorMessage = "Question couldn't be created. Please try again.";
      });
      console.log("creating question");
    }


//###########################################################################

		// Load Charts and the corechart package.
		// google.charts.load('current', {'packages':['corechart']});
		//
		// // Draw the pie charts when Charts is loaded.
		// google.charts.setOnLoadCallback(function() {
		//
		// 	// Create the data table
		// 	var data = new google.visualization.DataTable();
		// 	data.addColumn('string', 'Answers');
		// 	data.addColumn('number', 'Count');
		// 	data.addRows([
		// 		['Mushrooms', 1],
		// 		['Onions', 1],
		// 		['Olives', 2],
		// 		['Zucchini', 2],
		// 		['Pepperoni', 1]
		// 	]);
		//
		// 	var options = {
		// 		title:'#{question.question}'
		// 	};
		//
		// 	// Instantiate and draw the chart
		// 	var chart = new google.visualization.PieChart(document.getElementById('chart#{question.id}'));
		// 	chart.draw(data, options);
		// });
  }])
