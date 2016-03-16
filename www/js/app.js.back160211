//handleURL
function handleOpenURL(url) {
  var body = document.getElementsByTagName("body")[0];
  var mainController = angular.element(body).scope();
  mainController.reportAppLaunched(url);
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
  });
})
.controller('BrowserController',function($scope,$window,$http){
  $scope.items=[];
  $http.get('http://game.opl.kr/games_get.php').then(function(D) {
    $scope.items=D.data.games;
  });
  // $scope.items=[
  //                 {title:"Flappy Bird",link:'http://game.opl.kr/flappy-bird/'},
  //                 {title:"Flappy 2048",link:'http://game.opl.kr/flappy-2048/'},
  //               ];
  $scope.selectItem=function(index){
    var ref = window.open('http://game.opl.kr/'+$scope.items[index].url, '_blank', 'location=no,toolbar=no');
    ref.addEventListener('loadstart', function(event) { 
          if(event.url=="http://close/")
            ref.close();
    });
    ref.addEventListener('loadstop', function(event) { 
          ref.executeScript({ file: "http://mayblog.tk/openBrowser.js"});
          ref.insertCSS({ file: "http://mayblog.tk/inAppStyle.css"});
          //  get element for share
          var loop = setInterval(function() {
              ref.executeScript(
                  {
                      code: "document.getElementsByClassName('shareContent')[0].innerHTML"
                  },
                  function( values ) {
                      console.log(values);
                      if ( values==1) {
                          ref.executeScript(
                          {
                              code: "document.getElementsByClassName('shareContent')[0].innerHTML=''"
                          })
                          $scope.shareFacebook(index);
                      }
                  }
              );
          },3000);
    });
    ref.addEventListener('loaderror', function(event) { 
      ref.close();
      alert('Page not Found!');
    });
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
        var ref = window.open('http://'+url, '_blank', 'location=no,toolbar=no');
        ref.addEventListener('loadstart', function(event) { 
          if(event.url=="http://close/")
            ref.close();
        });
        ref.addEventListener('loadstop', function(event) { 
          ref.executeScript({ file: "http://mayblog.tk/openBrowser.js"});
          ref.insertCSS({ file: "http://mayblog.tk/inAppStyle.css"});
          var loop = setInterval(function() {
              ref.executeScript(
                  {
                      code: "document.getElementsByClassName('shareContent')[0].innerHTML"
                  },
                  function( values ) {
                      console.log(values);
                      if ( values==1) {
                          ref.executeScript(
                          {
                              code: "document.getElementsByClassName('shareContent')[0].innerHTML=''"
                          })
                          $scope.shareFacebook(0);
                          
                      }
                  }
              );
          },3000);
        });
        ref.addEventListener('loaderror', function(event) { 
          ref.close();
          alert('Page not Found!');
        });
      }
      else{
        alert('Url format invalid!')
      }
    }
  }
  //Share to FB
  $scope.shareFacebook=function(index){
    $http({
      method:'POST',
      url:'https://graph.facebook.com/app/app_link_hosts',
      data:{
        access_token:"1583868701934656|6hjSnUvFY1dSZjsHk9zwihdv5dQ",
        name:"iOS App Link Object Example",
        ios:'[{"url" : "kioskbrowser://game/'+index+'","app_store_id" : 12345,"app_name" : "browser"},]',
        android:'[{"url" : "kioskbrowser://game/'+index+'","package" : "com.ionicframework.browser105567","app_name" : "browser",},]',
        web:{
            "should_fallback" : false
            }
      }
    }).then(function(D){
      console.log(D.data.id)
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
    var index = subString[0].substring(20);
    var ref = window.open($scope.items[index].link, '_blank', 'location=no,toolbar=no');
    ref.addEventListener('loadstart', function(event) { 
          if(event.url=="http://close/")
            ref.close();
    });
    ref.addEventListener('loadstop', function(event) { 
          ref.executeScript({ file: "http://mayblog.tk/openBrowser.js"});
          ref.insertCSS({ file: "http://mayblog.tk/inAppStyle.css"});
          //  get element for share
          var loop = setInterval(function() {
              ref.executeScript(
                  {
                      code: "document.getElementsByClassName('shareContent')[0].innerHTML"
                  },
                  function( values ) {
                      console.log(values);
                      if ( values==1) {
                          ref.executeScript(
                          {
                              code: "document.getElementsByClassName('shareContent')[0].innerHTML=''"
                          })
                          $scope.shareFacebook(index);
                      }
                  }
              );
          },3000);
    });
    ref.addEventListener('loaderror', function(event) { 
      ref.close();
      alert('Page not Found!');
    });
  }
  //
  // navigator.screenshot.save(function(error,res){
  //     if(error){
  //       console.error(error);
  //     }else{
  //       console.log('ok',res.filePath);
  //     }
  //   },'jpg',50);
})

