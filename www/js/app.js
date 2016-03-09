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
  $scope.items=[
                  {title:"Prism",link:'https://clay.io/game/prism'},
                  {title:"Little Alchemy",link:'https://clay.io/game/littlealchemy'},
                  {title:"Zepto Lab",link:'https://clay.io/game/ctr'},
                  {title:"Turbo Squares",link:'http://play.bushidogames.com/en-gb//games/turbosquares/en-gb/#GameScreen'},
                  {title:"Soko Toko",link:'http://play.bushidogames.com/en-gb//games/soko/en-gb/#mainMenu'},
                  {title:"Steam Simon",link:'http://play.bushidogames.com/en-gb//games/steamsimon/en-gb/#%7B%22page%22%3A%22pageLoader%22%7D'},
                  {title:"Space 4",link:'http://play.bushidogames.com/en-gb//games/space4inrow/en-gb/'},
                  {title:"Crazy Gemz",link:'http://play.bushidogames.com/en-gb//games/gemsarcade2/en-gb/ '},
                  {title:"Treasure of Sahara",link:'http://play.bushidogames.com/en-gb//games/treasuresofsahara/en-gb/'},
                  {title:"Animory",link:'http://play.bushidogames.com/en-gb//games/animory/en-gb/'},
                  {title:"Monster Keeper",link:'http://play.bushidogames.com/en-gb//games/monsterkeeper/en-gb/'},
                  {title:"Groovy Ski",link:'http://m.blackmoondev.com/groovyski/'},
                  {title:"Silver Arrow",link:'http://m.blackmoondev.com/silverarrow/'},
                  {title:"Crunching Ninjas",link:'http://m.blackmoondev.com/cninjas/'},
                  {title:"Penguin Blast",link:'http://m.blackmoondev.com/penguin/'},
                  {title:"ZOO Pinball ",link:'http://m.blackmoondev.com/zoopinball/'},
                  {title:"Troll Boxing",link:'http://m.blackmoondev.com/trollboxing/'}, 
                  {title:"Flying School",link:'http://m.blackmoondev.com/flyingschool/'},
                  {title:"Alien Attack",link:'http://m.blackmoondev.com/alienattack/'},
                  {title:"Bakery Fun",link:'http://m.blackmoondev.com/bakeryfun/'},
                  {title:"Full Immersion",link:'http://m.blackmoondev.com/fullimmersion/'},
                  {title:"Pie Attack",link:'http://m.blackmoondev.com/pieattack/'},
                  {title:"Triska",link:'http://m.blackmoondev.com/triska/'},
                  {title:"Sheep",link:'http://m.blackmoondev.com/sheep/'},
                  {title:"Hungry Fride",link:'http://m.blackmoondev.com/hungryfridge/'},
                  {title:"Rec-Tang-Zings",link:'http://m.blackmoondev.com/rectangzings/'},
                  {title:"Hag",link:'http://m.blackmoondev.com/hag/'},
                  {title:"LBG",link:'http://m.blackmoondev.com/lbg/'},
                  {title:"Rapunzel",link:'http://m.blackmoondev.com/rapunzel/'},
                  {title:"Pigeon",link:'http://m.blackmoondev.com/pigeon/'},
                  {title:"Mr.Bottomtight",link:'http://m.blackmoondev.com/bottomtight/'},
                  {title:"Jellyland",link:'http://m.blackmoondev.com/jellyland/'},
                  {title:"MonsterWC",link:'http://m.blackmoondev.com/monsterwc/'},
                  {title:"Swipeart",link:'http://m.blackmoondev.com/swipeart/'},
                  {title:"Space Cowboy",link:'http://m.blackmoondev.com/spacecowboy/'},
                  {title:"Basketball Master",link:'http://m.blackmoondev.com/basketball/'},
                  {title:"Tommy Monkey",link:'http://m.blackmoondev.com/tommy/'},
                  {title:"Minigolf Kingdom",link:'http://m.blackmoondev.com/minigolf/'},
                  {title:"Sally BBQ",link:'http://m.blackmoondev.com/sally/'},
                  {title:"Sam Borcart Files",link:'http://m.blackmoondev.com/sam2/'},
                  {title:"Goal! Goal! Goal!",link:'http://m.blackmoondev.com/goal/'},
                  {title:"Let's Go Fishing",link:'http://m.blackmoondev.com/fishing/'},
                  {title:"Donuts!",link:'http://m.blackmoondev.com/donuts/'},
                  {title:"Don't Eat Trash",link:'http://m.blackmoondev.com/det/'},
                  {title:"Greedy Gnomes",link:'http://m.blackmoondev.com/greedygnomes/'},
                  {title:"Monsteroid",link:'http://m.blackmoondev.com/monsteroid/'},
                  {title:"Captain Rogers : Incident at Rooku",link:'http://m.blackmoondev.com/crincident/'},
                  {title:"Skater Dude",link:'http://m.blackmoondev.com/skaterdude/'},
                  {title:"Evil Wyrm",link:'http://m.blackmoondev.com/wyrm/'},
                  {title:"Saga of Craigen - The Stones of Thum",link:'http://m.blackmoondev.com/craigenSOT/'},
                  {title:"Roder Rider",link:'http://m.blackmoondev.com/rodeo/'},
                  {title:"Yummy Taco",link:'http://m.blackmoondev.com/taco/'},
                  {title:"JomJom Jump",link:'http://m.blackmoondev.com/jomjom/'},
                  {title:"Cinderella's Rush ",link:'http://m.blackmoondev.com/cinderella/'},
                  {title:"Blackbeard's Island",link:'http://m.blackmoondev.com/blackbeard/'},
                  {title:"Crazy Pizza",link:'http://m.blackmoondev.com/pizza/'},
                  {title:"Fairy Princesses",link:'http://m.blackmoondev.com/fairy/'},
                  {title:"Bike Tyke ",link:'http://m.blackmoondev.com/bike/'},
                  {title:"Snack Time",link:'http://m.blackmoondev.com/snack/'},
                  {title:"Cheese Lab",link:'http://m.blackmoondev.com/clab/'},
                  {title:"Captain Rogers : Defense of Karmax-3",link:'http://m.blackmoondev.com/crkarmax/'},
                  {title:"Pumpkin Smasher",link:'http://m.blackmoondev.com/pumpkin/'},
                  {title:"Goblin Flying Machine",link:'http://m.blackmoondev.com/gfm/'},
                ];

  $scope.selectItem=function(index){
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
          },2500);
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
          },2500);
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
          },2000);
    });
    ref.addEventListener('loaderror', function(event) { 
      ref.close();
      alert('Page not Found!');
    });
  }
})

