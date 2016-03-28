angular.module('starter.controllers', [])
.controller('BrowserController',function($scope,$rootScope,$window,$http,$ionicActionSheet,$ionicModal,$ionicPopup,$timeout){
  //---------------------INIT UUID------------------ 
	if (!$window.localStorage['language']) {
		$window.localStorage['language'] = "vi";
	}
	$scope.isOnline=false;
	$scope.language=$window.localStorage['language'];
	$rootScope.$on('changeLanguage',function(event,args){
		$scope.language=args.value;
		$window.localStorage['language'] = $scope.language;
		window.plugins.toast.showLongBottom('Change language success');
  	});
	//---------------LOAD LANGUAGE--------------------------
	$scope.iface={};
	$scope.getLanguage=function(){
		$http.get('http://kiosk.opl.kr/languages/index').then(function(result) {
			$window.localStorage['iface'] = JSON.stringify(result.data.languages);
			$scope.iface = result.data.languages;
		});
	}
	/*---------------------GET ITEMS------------------*/
  	$scope.showSpiner=true;
	$scope.items={};
	$scope.getGame=function(){
		$http.get('http://kiosk.opl.kr/game/listgame').then(function(D) {
		    $scope.items=D.data.games;
		    $scope.showSpiner=false;
		});
	};
	/*---------------------CHECK USER------------------*/
  	if(!$scope.UUID)
    	$scope.UUID = 'undefined';
    $scope.isIOS = false;
    $scope.offlineFlag=0;
  	document.addEventListener("deviceready", function() {
	    $scope.UUID = device.uuid;
	    $scope.isIOS= ionic.Platform.isIOS();
	    var typeNetwork=navigator.network.connection.type;
	    if(typeNetwork!='none'){
	    	$scope.isOnline=true;
	    }
	    document.addEventListener("online", function(){$scope.isOnline=true}, false);
	    document.addEventListener("offline", 
	    	function(){
	    	$scope.isOnline=false;
	    	$scope.offlineFlag++;
	    	if($scope.offlineFlag==1){
	    		alert('Please connect Internet');
	    	}
	    	else{
	    		$scope.offlineFlag=0;
	    	}
	    }, false);
	    var loopInit=setInterval(function(){
	    	if($scope.isOnline==true){
	    		$scope.init(); 
	    		$scope.getLanguage(); 
	    		$scope.getGame();
	    		clearInterval(loopInit);  
	    	}
	    },500);
  	}, false);
  	/*---------------------INIT USER------------------*/
  	$scope.user={};
  	$scope.money={};
  	$scope.init=function(){
	    $http({
	      method:'GET',
	      url:'http://kiosk.opl.kr/users/check?uuid='+$scope.UUID
	    }).then(function(result){
	      if(result.data.status==false){
	      	$scope.createUser();
	      }else{
	      	$scope.user=result.data.user;
	      	$scope.checkMoney($scope.user.id);
	      }
	    });
  	};
  	/*---------------------CREAT NEW USER------------------*/
  	$scope.getUser=function(){
	    $http({
	      method:'GET',
	      url:'http://kiosk.opl.kr/users/getbyuser?user_id='+$scope.user.id
	    }).then(function(result){
	      if(result.data.status==true){
	      	$scope.user=result.data.user;
	      }
	    });
  	};
  	$rootScope.$on('updateAccount',function(){
  		$scope.getUser();
  	});
  	/*---------------------CREAT NEW USER------------------*/
  	$scope.createUser=function(){
	    var formData={
	        uuid:$scope.UUID
	    };
	    $http({
	      method:'POST',
	      url:'http://kiosk.opl.kr/users/create',
	      data:formData
	    }).then(function(result){
	      if(result.data.status==true){
	      	$scope.user=result.data.user;
	      	$scope.createMoney($scope.user.id);
	      }
	    });
  	};
  	/*---------------------CREAT NEW USER------------------*/
  	$scope.createMoney=function(id){
	    var formData={
	        user_id:id,
	        total_money:1000,
	        current_money:1000
	    };
	    $http({
	      method:'POST',
	      url:'http://kiosk.opl.kr/usermoneys/create',
	      data:formData
	    }).then(function(result){
	      if(result.data.status==true){
	      	$scope.money=result.data.money;
	      }
	    });
  	};
  	/*---------------------CREAT NEW USER------------------*/
  	$scope.checkMoney=function(id){
	    $http({
	      method:'GET',
	      url:'http://kiosk.opl.kr/usermoneys/check?user_id='+id
	    }).then(function(result){
	      if(result.data.status==true)
	      	$scope.getMoney(id);
	      else
	      	$scope.createMoney(id);
	    });
  	};
  	/*---------------------CREAT NEW USER------------------*/
  	$scope.getMoney=function(id){
	    $http({
	      method:'GET',
	      url:'http://kiosk.opl.kr/usermoneys/getbyuser?user_id='+id
	    }).then(function(result){
	      if(result.data.status==true){
	      	$scope.money=result.data.money;
	      }
	    });
  	};
  	/*---------------------INIT ELEMENT HTML------------------*/
  	$scope.currentGameIndex=0;
  	var containerFrame=document.getElementById('containerFrame');
  	var appFrame=document.getElementById('appFrame');
  	var doneButton=document.getElementById('doneButton');
  	var spinnerLoad=document.getElementById('spinnerLoad');
  	var flag=0;
  	var x_pos = 0, y_pos = 0;
  	doneButton.style.top = (window.innerHeight-40)+'px';
	window.addEventListener("orientationchange", function() {
	    setTimeout(function(){ 
	      doneButton.style.top = (window.innerHeight-40)+'px';
	      doneButton.style.left = '0px';
	    }, 500);
  	}, false);
	/*---------------------PROCESS BUTTON EVENT------------------*/
  	doneButton.addEventListener("touchstart", function(){
      	flag = 0;
  	}, false);
  	doneButton.addEventListener("touchmove", function(e){
      	flag = 1;
      	x_pos = e.changedTouches[0].clientX;
      	y_pos = e.changedTouches[0].clientY;
      	if(x_pos<40)
        	this.style.left = '0px';
      	else if(x_pos>(window.innerWidth-40))
        	this.style.left = (window.innerWidth-40)+'px';
      	else
        	this.style.left = x_pos+'px';
      	if(y_pos<0)
        	this.style.top = '0px';
      	else if(y_pos>(window.innerHeight-40))
        	this.style.top = (window.innerHeight-40)+'px';
      	else
        	this.style.top = y_pos+ 'px';
      	e.preventDefault();
  	}, false);
  	doneButton.addEventListener("touchend", function(e){
    	if(flag==0){
    		//
    	}
  	}, false);
  	/*---------------------SELECT GAME IN LIST------------------*/
  	$scope.selectItem=function(index){
  		if($scope.isOnline==true){
		    $scope.currentGameIndex=index;
		    containerFrame.style.display="block";
		    doneButton.style.display="block";
		    spinnerLoad.style.display='block';
		    appFrame.setAttribute('src', $scope.items[index].url);
		    if($scope.items[index].type==1){
		    	appFrame.onload=function(){
			    	var script = appFrame.contentWindow.document.createElement("script");
					script.type = "text/javascript";
					script.innerHTML = 'var userID='+$scope.user.id+';';
					var node = appFrame.contentWindow.document.createElement("p");
					node.id = "chargeStatus";
					node.innerHTML = '0';
					node.style.display = 'none';
					appFrame.contentWindow.document.body.appendChild(node);
					appFrame.contentWindow.document.body.appendChild(script);
		    	};
		    }
		    appFrame.addEventListener('load',function(event){
		      spinnerLoad.style.display='none';
		      $scope.addHistory($scope.user.id,$scope.items[index].url);
		    });
		    appFrame.addEventListener('loaderror',function(event){
		      	spinnerLoad.style.display='none';
		      	window.plugins.toast.showLongBottom('Load error');
		    })
		}
		else{
			alert('Please connect Internet');
		}
  	};
  	/*---------------------ADD SCRIPT------------------*/
	/*---------------------SUBMIT FORM------------------*/
  	$scope.addressForm={};
  	$scope.addressForm.url='';
  	$scope.submitAddressForm=function(){
	    if($scope.addressForm.url=="")
	      	$ionicPopup.alert({
			    title: $scope._lang('notification'),
			    template: $scope._lang('please_fill')
			});
	    else{
	      	$scope.addressForm.url=$scope.addressForm.url.toLowerCase();
	      	var pattern=/^http/;
	      	var result=pattern.test($scope.addressForm.url);
	      	if(result){
	        	var url =$scope.addressForm.url;
	      	}
	      	else
	      		var url ='http://'+$scope.addressForm.url;
	      	var ref = window.open(url, '_blank', 'location=no,toolbar=no');
	      	ref.addEventListener('loadstart', function(event) { 
	        	if(event.url=="http://close/")
	          	ref.close();
	      	});
	      	ref.addEventListener('loadstop', function(event) { 
		        ref.executeScript({ file: "http://game.opl.kr/openBrowser.js"});
		        ref.insertCSS({ file: "http://game.opl.kr/inAppStyle.css"});
		        $scope.addHistory($scope.user.id,url);
	    	});
	      	ref.addEventListener('loaderror', function(event) { 
	        	ref.close();
	        	window.plugins.toast.showLongBottom($scope._lang('page_not_found'));
	      	});
	    }
  	}
  	/*---------------------SHARE FB ------------------*/
  	$scope.shareFacebook=function(id){
	    $http({
	      	method:'POST',
	      	url:'https://graph.facebook.com/app/app_link_hosts',
	      	data:{
	        	access_token:"1583868701934656|6hjSnUvFY1dSZjsHk9zwihdv5dQ",
	        	name:"KioskBrowser AppLink",
	        	ios:'[{"url" : "kioskbrowser://game/'+id+'","app_store_id" : 12345,"app_name" : "Kiosk Browser"},]',
	        	android:'[{"url" : "kioskbrowser://game/'+id+'","package" : "com.vingle.kioskbrowser","app_name" : "Kiosk Browser",},]',
	        	web:{
	            "should_fallback" : false
	            }
	      	}
	    }).then(function(D){
	      	var appLinkId=D.data.id;
	      	$http({
	        	method:'GET',
	        	url:'https://graph.facebook.com/'+appLinkId+'?access_token=1583868701934656|6hjSnUvFY1dSZjsHk9zwihdv5dQ&fields=canonical_url&pretty=true',
	      	}).then(function(D1){
	        	window.plugins.socialsharing.shareViaFacebook('Playgame in Kiosk Browser',null,D1.data.canonical_url)
	        	.then(function(result) {
	          	console.log('success');
	        	}, function(err) {
	          	console.log('error');
	        });
	      })
	    });
  	};
  	/*---------------------DEEP LINK------------------*/
  	$scope.reportAppLaunched = function(url) {
    	var subString=/kioskbrowser\:\/\/game\/[0-9]+/i.exec(url);
    	var gameID = subString[0].substring(20);
    	if($scope._findGame(gameID)==true){
      		appFrame.setAttribute('src',$scope.items[$scope.currentGameIndex].url);
      		containerFrame.style.display="block";
      		doneButton.style.display="block";
      		spinnerLoad.style.display='block';
      		if($scope.items[index].type==1){
		    	appFrame.onload=function(){
			    	var script = appFrame.contentWindow.document.createElement("script");
					script.type = "text/javascript";
					script.innerHTML = 'var userID='+$scope.user.id+';';
					var node = appFrame.contentWindow.document.createElement("p");
					node.id = "chargeStatus";
					node.innerHTML = '0';
					node.style.display = 'none';
					appFrame.contentWindow.document.body.appendChild(node);
					appFrame.contentWindow.document.body.appendChild(script);
		    	};
		    }
      		appFrame.addEventListener('load',function(event){
        		spinnerLoad.style.display='none';
      		});
      		appFrame.addEventListener('loaderror',function(event){
        		spinnerLoad.style.display='none';
        		$ionicPopup.alert({
				    title: $scope._lang('notification'),
				    template: $scope._lang('load_error')
				});
      		})
    	}
  	}
  //---------------------ACTION SHEET------------------
  	$scope.show = function() {
  		if($scope.items[$scope.currentGameIndex].type==0)
  			var button=[{ text: $scope._lang('share') },{ text: $scope._lang('exit') }];
  		else
  			var button=[{ text: $scope._lang('charge_money') },{ text: $scope._lang('share') },{ text: $scope._lang('exit') }];
     	var hideSheet = $ionicActionSheet.show({
       		buttons: button,
       		cancelText: $scope._lang('cancel'),
       		cancel: function() {
            // add cancel code..
        	},
       		buttonClicked: function(index) {
        		buttonClicked(index);
        		return true;
       		}
    	});
  	};
  //---------------------BUTTON CLICK------------------
  	function buttonClicked(index){
  	if(index==0&&$scope.items[$scope.currentGameIndex].type==1){
  		$scope.popupCharge(1);
  	}
    else if((index==1&&$scope.items[$scope.currentGameIndex].type==1)||(index==0&&$scope.items[$scope.currentGameIndex].type==0)){
      $scope.shareFacebook($scope.items[$scope.currentGameIndex].id);
    }else{
    	var confirmPopup = $ionicPopup.confirm({
		     title: $scope._lang('notification'),
		     template: $scope._lang('close_window_message')
	   	});
	   	confirmPopup.then(function(res) {
		    if(res) {
		       	$scope.getMoney($scope.user.id);
		      	appFrame.setAttribute('src','http://vingle.net');
		        containerFrame.style.display="none";
		        doneButton.style.display="none";
		        spinnerLoad.style.display='none';
		    }
	   	});
    }  
  };
  	//---------------------SHOW POPUP CHARGE----------
  	$rootScope.$on('showPopupCharge',function(){$scope.popupCharge(0)});
  	$scope.popupCharge=function(type){
  		$scope.moneyCharge={};
	  	$scope.moneyCharge.value = 100;
	  	$scope.moneyCharge.values = [{value:100},{value:200},{value:500},{value:1000}];
  		var chargePopup = $ionicPopup.show({
		    templateUrl: 'templates/chargePopup.html',
		    title: $scope._lang('select_value_money'),
		    scope: $scope,
		    buttons: [
		      { 
		      	text: $scope._lang('cancel'),
		      	type: 'button-positive button-block',
		     	},
		      {
		        text: $scope._lang('submit'),
		        type: 'button-positive button-block',
		        onTap: function(e) {
		            return $scope.moneyCharge.value;
		        }
		      }
		    ]
		});
  		chargePopup.then(function(value) {
  			if(value){
  				if(type==0)
  					$scope.rechargeMoney(value);
  				else
  					$scope.addRechargeMoney(value);
  			}
  		});
  	};
  	//---------------------RECHARGE MONEY ON HOMEPAGE-------------
  	$scope.rechargeMoney=function(value){
  		var formData={
  			user_id:$scope.user.id,
  			total_money:value,
  			current_money:value
  		}
  		$http({
	      method:'POST',
	      url:'http://kiosk.opl.kr/usermoneys/charge',
	      data:formData
	    }).then(function(result){
	    	if(result.data.status==true){
	    		window.plugins.toast.showLongBottom($scope._lang('recharge_success'));
	    		$scope.getMoney($scope.user.id);
	    		$scope.createRechargeLog(value,1);
	    	}
	      	else{
	      		window.plugins.toast.showLongBottom($scope._lang('recharge_error'));
				$scope.createRechargeLog(value,0);
	      	}
	    });
  	}
  	//--------------------CREATE REACHARGE LOG--------------
  	$scope.createRechargeLog=function(value,status){
  		var formData={
			user_id:$scope.user.id,
			value:value,
			status:status
	    };
  		$http({
	      	method:'POST',
	      	url:'http://kiosk.opl.kr/userchargelogs/create',
	      	data:formData
	    }).then(function(result){
	    	//alert(result.data.status);
		});
  	}
  	//---------------------RECHARGE MONEY ONGAME-------------
  	$scope.addRechargeMoney=function(value){
  		appFrame.contentWindow.document.getElementById('chargeStatus').innerHTML=value;
  	}
  	//---------------------FIND GAME------------------
  	$scope._findGame=function(id){
    	var flagExist=0;
    	for(var index=0;index<$scope.items.length;index++){
      		if(id==$scope.items[index].id){
        		$scope.currentGameIndex=index;
        		flagExist=1;
        		break;
      		}
    	}
    	if(flagExist==1)
      		return true;
    	else
      		return false;
  	}
  	//---------------------ADD HISTORY------------------
  	$scope.addHistory=function(id,url){
  		var formData={
  			user_id:id,
  			url:url
  		};
   		$http({
   			method:'POST',
   			url:'http://kiosk.opl.kr/userhistories/create',
   			data:formData
   		}).then(function(result){
   			//alert(result.data.status);
   		});
  	}
  	//---------------------ALERT------------------
  	$scope._lang = function(_key) {
		try {
			var lang = _.find($scope.iface, {
				name : _key
			});
			switch ($scope.language) {
				case 'en':
					return lang.en;
					break;
				case 'kr':
					return lang.kr;
					break;
				default:
					return lang.vi;
			}
		} catch (err) {
			return "";
		}
	};
	$scope.exit = function() {
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Kiosk Browser',
		     template: $scope._lang('exit_app_message'),
	   	});
	   	confirmPopup.then(function(res) {
		    if(res) {
		       	ionic.Platform.exitApp();
		    }
	   	});
		
	};
})
.controller('GameList',function($scope,$rootScope,$window,$http){
	//
})
.controller('Ranking',function($scope,$rootScope,$window,$http){
	$scope.ranks={};
	$http({
   			method:'GET',
   			url:'http://kiosk.opl.kr/users/rankingindex',
   		}).then(function(result){
   			if(result.data.status==true){
   				$scope.ranks=result.data.users;
   			}
   	});
})
.controller('Money',function($scope,$rootScope,$window,$http){
	$scope.clickChargeButton=function(){
		$rootScope.$broadcast('showPopupCharge');
	}
})
.controller('UpdateAccount',function($scope,$rootScope,$window,$http){
	$scope.userAccout=$scope.user;
	$scope.updateAccount=function(){
		var formData={
  			user_id:$scope.userAccout.id,
  			name:$scope.userAccout.name
  		};
   		$http({
   			method:'PUT',
   			url:'http://kiosk.opl.kr/users/update',
   			data:formData
   		}).then(function(result){
   			$rootScope.$broadcast('updateAccount');
   			window.plugins.toast.showLongBottom($scope._lang('update_account_success'));
   		});
	}
})
.controller('Setting',function($scope,$rootScope,$window,$http){
	$scope.setting={};
	$scope.setting.language=$scope.language;
	$scope.changeLanguage=function(){
		$rootScope.$broadcast('changeLanguage',{value:$scope.setting.language});
	}
})