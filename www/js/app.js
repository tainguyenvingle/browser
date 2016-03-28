//handleURL
function handleOpenURL(url) {
  var body = document.getElementsByTagName("body")[0];
  var mainController = angular.element(body).scope();
  setTimeout(function() {
      mainController.reportAppLaunched(url);
  }, 0);
}

angular.module('starter', ['ionic','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function($rootScope) {
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
      StatusBar.hide();
      ionic.Platform.fullScreen(); 
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app', {
    url : '/app',
    abstract : true,
    templateUrl : 'templates/menu.html',
    // controller : 'AppCtrl'
  }).state('app.game-list', {
    url : '/game-list/:list',
    views : {
      'menuContent' : {
        templateUrl : 'templates/game-list.html',
        controller : 'GameList'
      }
    }
  })
  .state('app.ranking', {
    url : '/ranking',
    views : {
      'menuContent' : {
        templateUrl : 'templates/ranking.html',
        controller : 'Ranking'
      }
    }
  })
  .state('app.money', {
    url : '/money',
    views : {
      'menuContent' : {
        templateUrl : 'templates/money.html',
        controller : 'Money'
      }
    }
  })
  .state('app.update-account', {
    url : '/update-account',
    views : {
      'menuContent' : {
        templateUrl : 'templates/update-account.html',
        controller : 'UpdateAccount'
      }
    }
  })
  .state('app.setting', {
    url : '/setting',
    views : {
      'menuContent' : {
        templateUrl : 'templates/setting.html',
        controller : 'Setting'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/game-list/latest');

});


