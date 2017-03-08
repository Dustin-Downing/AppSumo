angular.module('sumoApp', ['ngMaterial', 'ngResource'])
	.controller('LoginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.showAdmin = false;
		$scope.isNewUser = "true";
    // $scope.adminLogin = () => {
    //   //hide old error messages
    //   $scope.showError = false;
    //   //check the password
    //   if($scope.password == "1234") { // TODO(): add auth
    //     $window.location.href = '/dashboard';
    //   } else {
    //     $scope.showError = true;
    //     $scope.errorMessage = "Password incorrect. Please try again.";
    //   }
    // };
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
      //hide old error messages
      $scope.showError = false;
      if(!$scope.result){
        //if no result was selected
        $scope.showError = true;
        $scope.errorMessage = "Nothing selected. Please try again.";
      } else {
        //creating answer
        $http.post('/answers/create', {
          'result':$scope.result,
          'UserId':$window.userId,
          'QuestionId':$window.questionId
        }).success(function(data, status, headers, config) {
          console.log("creating a new answer: "+$scope.result);
          $scope.user = data;
          $window.location.href = '/welcome/'+$scope.user.id;
        }).error(function(data) {
          console.log("Ops: " + data);
          $scope.showError = true;
          $scope.errorMessage = "There was a problem submitting your answer. Please try again.";
        });
      }
    }
  }])
  .controller('DashCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    //TODO(): disable hide addNew when on just the dashboard page
    $scope.options = [];
    $scope.count = [];
    $scope.addOption = () => {
      //TODO(): add form validation for options.push(newOption) dups
      $scope.options.push($scope.newOption);
      $scope.newOption='';
    }
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
  }])
