//handleURL
function handleOpenURL(url) {
  var body = document.getElementsByTagName("body")[0];
  var mainController = angular.element(body).scope();
  setTimeout(function() {
      mainController.reportAppLaunched(url);
  }, 0);
}

angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    ionic.Platform.fullScreen(true,true);
  });
})
.controller('BrowserController',function($scope,$window,$http,$ionicActionSheet){
  document.addEventListener("deviceready", function onDeviceReady(w) {
    // Should work on Andriod
    if(StatusBar && statusbarTransparent) {
        // Enable translucent statusbar
        statusbarTransparent.enable();

        // Get the bar back
        StatusBar.show();
    }
    // iOS only
    else if (StatusBar) {
        // Get the bar back
        StatusBar.show();
    }
  }, false);
  //get item
  $scope.items=[];
  $http.get('http://game.opl.kr/games_get.php').then(function(D) {
    $scope.items=D.data.games;
  });
  $scope.currentGameIndex=0;
  //iFrame
  var containerFrame=document.getElementById('containerFrame');
  var appFrame=document.getElementById('appFrame');
  //button
  var doneButton=document.getElementsByClassName('doneButton')[0];
  var flag=0;
  var x_pos = 0, y_pos = 0;
  //event of doneButton
  doneButton.style.top = (window.innerHeight-40)+'px';
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
    }
  }, false);
  //--------
  $scope.selectItem=function(index){
    $scope.currentGameIndex=index;
    containerFrame.style.display="block";
    doneButton.style.display="block";
    appFrame.setAttribute('src', 'http://game.opl.kr/'+$scope.items[index].url);
    appFrame.addEventListener('loaderror',function(event){
      alert('error');
    })
  };
  //submit URL Form
  $scope.submitForm=function(){
    var url=angular.element(document.getElementById("urlinput"))[0].value;
    if(url=="")
      alert('Please fill!')
    else{
      url=url.toLowerCase();
      var pattern=/^[a-z0-9]*(\.[a-z0-9]*){1,2}/;
      var result=pattern.test(url);
      if(result){
        cordova.plugins.Keyboard.close();
        appFrame.setAttribute('src','http://'+url);
        containerFrame.style.display="block";
        doneButton.style.display="block";
        appFrame.addEventListener('loaderror',function(event){
          alert('error');
        })
      }
      else{
        alert('Url format invalid!')
      }
    }
  }
  //Share to FB
  $scope.shareFacebook=function(id){
    //create applink facebook
    $http({
      method:'POST',
      url:'https://graph.facebook.com/app/app_link_hosts',
      data:{
        access_token:"1583868701934656|6hjSnUvFY1dSZjsHk9zwihdv5dQ",
        name:"KioskBrowser AppLink",
        ios:'[{"url" : "kioskbrowser://game/'+id+'","app_store_id" : 12345,"app_name" : "browser"},]',
        android:'[{"url" : "kioskbrowser://game/'+id+'","package" : "com.ionicframework.browser105567","app_name" : "browser",},]',
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
  //process params from AppLink FB
  $scope.reportAppLaunched = function(url) {
    var subString=/kioskbrowser\:\/\/game\/[0-9]+/i.exec(url);
    var gameID = subString[0].substring(20);
    if($scope._findGame(gameID)==true){
      appFrame.setAttribute('src', 'http://game.opl.kr/'+$scope.items[$scope.currentGameIndex].url);
      containerFrame.style.display="block";
      doneButton.style.display="block";
    }
  }
  //actionSheet
  $scope.show = function() {
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: 'Share' },
         { text: 'Exit' }
       ],
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         buttonClicked(index);
         return true;
       }
     });

  };
  //process actionSheet Button
  function buttonClicked(index){
    if(index==0){
      $scope.shareFacebook($scope.items[$scope.currentGameIndex].id);
    }else{
      var r=confirm('Do you want close this window?');
      if(r==true){
        containerFrame.style.display="none";
        doneButton.style.display="none";
      };
    }  
  };
  //findGame
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
})

