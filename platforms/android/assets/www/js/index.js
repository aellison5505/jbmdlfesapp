
window.page = "#load_pg";
window.isphone = true;
window.window.db = null;
window.bugon = false;
window.bug_str = "";

var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.factory('ShareBldgCall', function ($location,LocalBase,$q) {
	var bldgcall = {};
	bldgcall.bldg = null;
	bldgcall.doc = null;

	bldgcall.base = LocalBase;

	bldgcall.lookup = function (bldg) {
		bldgcall.bldg = bldg;
		bldgcall.doc = null;
		return $q(function(resolve, reject){
			bldgcall.base.get(bldg)
			.then(function (ret) {
				
					bldgcall.doc = ret;
					console.log("doc: " + bldgcall.doc);
					$location.path('/lookup');
					resolve(ret);
			
			}).catch(function (err) {
					reject(err);
			});
		});
	console.log(bldgcall.doc);
	}
	
	return bldgcall;			
});

mainApp.factory('ShareClk', function () {
	var ShareClk = {};

	ShareClk.pVis = false;

	ShareClk.show = function (pass) {
		ShareClk.pVis = pass;
	//	console.log(ShareClk.pVis);
	};

	return ShareClk;
});

mainApp.service('initLoad', function ($rootScope) {
	this.load = function () {

		window.isphone = false;

		if (document.URL.indexOf("http://") === -1
			 && document.URL.indexOf("https://") === -1) {
			isphone = true;
		} else {
			isphone = false;
		}

		//		isphone = false;
		if (isphone) {
			document.addEventListener("deviceready", function () {
				

				$rootScope.$emit('callReady', 'app ready');

			}, false);
			
			document.addEventListener('backbutton', function (e) {

				 e.preventDefault();
				 $rootScope.$emit('callExit', 'exit called');

			},false);
			
			console.log("phone");

		} else {
			$rootScope.$emit('callReady', 'app ready');
			
		}

	}

});

mainApp.factory('LocalBase', function ($rootScope, $q) {
	var base = {};
	base.db = null;

	base.config = function () {
		base.db = new PouchDB('jbmdl_db', {
				skip_setup: true
			});

		base.db.info().then(function (info) {
			console.log(info);
			base.sync();
		}).catch (function (err) {
			console.log("call setup");
			base.db = new PouchDB('jbmdl_db', {
					skip_setup: false
				});
			base.sync();
		});
	}

	base.sync = function () {
		var remoteDB = new PouchDB('https://jbmdl_app:app_jbmdl@app.mobilewebapp.net:8000/test_db/');
		base.db.replicate.from(remoteDB).on('complete', function () {
			console.log("syn");
			$rootScope.$emit('callFileDone', 'DB Loaded');
		}).on('error', function (err) {
			console.log(err);
		});
		remoteDB = null;
	}

	base.get = function (pull) {
		return $q(function(resolve, reject){
					
			base.db.get(pull).then(function (doc) {
				console.log(doc);
				resolve(doc);
			}).catch (function (err) {
				reject(err);
			});
			
		});	
	};
	

	return base;
});
