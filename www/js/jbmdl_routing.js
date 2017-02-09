
mainApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	   $locationProvider.hashPrefix('');
	   $routeProvider.
	   
	   when('/', {
		  templateUrl: 'welcome.html'
	   }).
	   
	   when('/welcome', {
		  templateUrl: 'welcome.html'
	   }).
	   
	   when('/loading', {
		  templateUrl: "<h2>Loading ....</h2>"
	   }).
	   
	   when('/lookup', {
		  templateUrl: 'lookup.html', controller: 'LookupController'
	   }).
	   
	   when('/bldg_form', {
		  templateUrl: 'bldg_form.html', controller: 'BldgFormController'
	   }).
	   
	    when('/debug', {
		  templateUrl: 'debug.html', controller: 'DebugController'
	   }).
	   
	   otherwise({
		  redirectTo: '/'
	   });
}]);