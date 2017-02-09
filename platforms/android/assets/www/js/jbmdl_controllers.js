
mainApp.controller('MainController', function ($scope, $rootScope, $timeout, initLoad, LocalBase, ShareDebugPush) {
	//		trans = FileTrans;
	//		base = Database;
	loc = LocalBase;
	share = ShareDebugPush;

	$scope.init = function () {
		console.log("init");
		angular.element(document).ready(function () {

			console.log("doc ready");
			
			$rootScope.$on('callExit', function (event, data) {

				console.log(data); // 'Data to send'
				var r = confirm("Are you sure you want to exit?");
					if (r == true) {
											
						if(navigator.app){
						navigator.app.exitApp();
						}
						if(navigator.device){
						navigator.device.exitApp();
						}else{
							window.close();
							window.location.href = "goodbye.html";
						}
					}
			});
						

			$rootScope.$on('callReady', function (event, data) {

				console.log(data); // 'Data to send'
				loc.config();
				//  initLoad.onDeviceReady();
				//	trans.load();
				//  $rootScope.$emit('statusSend', 'Complete');

			});

			$rootScope.$on('callFileDone', function (event, data) {

				console.log(data); // 'Data to send'
				// base.load();
				$rootScope.$broadcast('statusSend', 'Complete');
				$timeout(function () {
					$rootScope.$apply();
				});
			});

			initLoad.load();

		});

	};

});

mainApp.controller('MenuController', function ($scope, ShareClk, $rootScope) {

	$scope.vis = ShareClk;

	$scope.hide = function () {
		//	$scope.vis=false;
		$scope.vis.show(false);
	};

	$scope.show = function () {
		//	$scope.vis=true;
		$scope.vis.show(true);
	};
	
	$scope.exit = function () {
		$rootScope.$emit('callExit', 'exit called');
		$scope.hide();
	}

});

mainApp.controller('BldgFormController', function ($scope, $timeout, $location, ShareBldgCall) {

	var share = ShareBldgCall;
	$scope.$emit('statusSend', 'Waiting...');

	$scope.sub = function () {
		if (isNaN($scope.bldg)) {
			$scope.err = "Please enter numbers only!";
		} else {
			share.lookup($scope.bldg)
			
			.catch(function(err){
				console.log(err);
				
					$scope.err = "Building not found";
			});
				console.log($scope.err);
				$timeout(function () {
					$scope.$apply();
				});

		}
	}

});

mainApp.controller('BldgRetController', function ($scope) {

	$scope.sub = function () {
		if (isNaN($scope.bldg)) {
			$scope.err = "Please enter numbers only!";
		} else {
			$scope.err = "good";
		}
	}

});

mainApp.controller('HeadController', function ($scope, ShareClk) {

	$scope.sClk = ShareClk;

	$scope.tog = function () {
		$scope.sClk.show(true);
	};
});

mainApp.controller('LookupController', function ($scope, $rootScope,$timeout, ShareBldgCall) {
	
	var share = ShareBldgCall;

	$scope.msg = share.doc;

	$rootScope.$broadcast('statusSend', 'Complete');
	$timeout(function () {
					$rootScope.$apply();
	});
	
});

mainApp.controller('DebugController', function ($scope, $timeout, $rootScope, ShareDebugPush) {
	
	var share = ShareDebugPush;
	

	$scope.debugmsg = share.msg;

});
