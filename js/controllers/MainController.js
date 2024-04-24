
app.controller("MainController", ["$scope", "$http", function($scope, $http){
	
	$scope.tasks=[];
	$scope.inputTaskName="";
	$scope.visibilityTasksContainer = false;


	window.onload = function(){
		$http({method: 'GET', url: '/get_tasks'}).
		then(function successCallback(response) {
			$scope.tasks = JSON.parse(angular.toJson(response.data));
			if($scope.tasks.length>0){
				$scope.setTasksContainerVisibility();
			}
		}, function errorCallback(response) {

		});
		
	}

	window.onbeforeunload = function () {
		//if($scope.tasks.length>0){
			$http.post('/post_tasks', angular.toJson($scope.tasks));
		//}
	}



	$scope.addTask = function(name){
		if(name.trim()==""){
			return;
		}
		newTaskObject = {
			name: name,
			completed: false,
			show: true
		}

		$scope.tasks.push(newTaskObject);

		$scope.inputTaskName = "";

		$scope.setTasksContainerVisibility();
	}

	$scope.toggleCompleted = function(index){
		$scope.tasks[index].completed = !$scope.tasks[index].completed; 
	}



	$scope.setTasksContainerVisibility = function(){
		if($scope.tasks.length>0){
			$scope.visibilityTasksContainer = true;
		}
		else{
			$scope.visibilityTasksContainer = false;
		}

		if(!$scope.$$phase) {
			$scope.$apply();
		}
	}

	$scope.showNotCompletedTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			if($scope.tasks[key].completed){
				$scope.tasks[key].show = false;
			}
			else{
				$scope.tasks[key].show = true;          }
			})
	}

	$scope.showCompletedTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			if($scope.tasks[key].completed){
				$scope.tasks[key].show = true;
			}
			else{
				$scope.tasks[key].show = false;
			}
		})
	}

	$scope.showAllTasks = function(){
		angular.forEach($scope.tasks, function(task , key) {
			$scope.tasks[key].show = true;
		})
	}

	$scope.deleteTask = function(index){
		$scope.tasks.splice(index,1);
	}

	$scope.deleteCompleted = function(){
		$scope.notCompletedTasks=[];
		angular.forEach($scope.tasks, function(task , key) {
			if(!task.completed){
				$scope.notCompletedTasks.push(task);
			}
		})
		$scope.tasks = $scope.notCompletedTasks;
	}

	$scope.deleteAll = function(){
		$scope.tasks = [];
	}

	$scope.saveAsCookie = function(tasksJson){
		$cookieStore.put('tasks', tasksJson)
	}


}]);