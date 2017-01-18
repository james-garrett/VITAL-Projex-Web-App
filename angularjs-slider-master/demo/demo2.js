//REMEMBER CTRL+F5 TO VIEW CHANGES ON PAGE

var app = angular.module('rzSliderDemo', ['rzModule', 'ui.bootstrap', 'ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'index.php'
  })
  .state('first', {
    url: '/first',
    templateUrl: 'q1.html'
  })
  .state('second', {
    url: '/second',
    templateUrl: 'q2.html'
  })
  .state('last', {
    url: '/last',
    templateUrl: 'last.html'
  })
  ;
  $urlRouterProvider.otherwise('/');  
});



app.controller('MainCtrl', function($scope, $rootScope, $timeout, $uibModal) {
  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };

  // $(function changeHREF() {
  //   $("#theLink").click(function(){
  //       $(this).attr("href","http://tnbelt.com");
  //   });
  // // http://stackoverflow.com/questions/9933835/modify-target-url-in-onclick-handler  
  // // http://jsbin.com/icUTUjI/1/edit?html,js,output  
  // });


  //Slider with ticks values and legend
  $scope.slider_ticks_legend = {
    value: 4,
    options: {
      showTicksValues: true,
      ceil: 7,
      floor: 1,

      stepsArray: [
        {value: 1, legend: 'Lie; Dishonest; Untrustworthy'},
        {value: 2, legend: 'Cheat; Deceive'},
        {value: 3, legend: 'White Lies'},
        {value: 4, legend: 'Honest'},
        {value: 5, legend: 'Honest but...'},
        {value: 6, legend: 'Gossip'},
        {value: 7, legend: 'Hard Hearted or Idealistic'},
        
      ],
      getPointerColor: function(value) {
            if (value <= 2) {
                return 'green';
              }
            if (value <= 5) {
                return 'blue';
              }
            if (value <= 7) {
                return 'purple';
              }
            return '#2AE02A';
        }
    }
  };


  $scope.toggleHighValue = function() {
    if ($scope.slider_all_options.maxValue != null) {
      $scope.slider_all_options.maxValue = undefined;
    } else {
      $scope.slider_all_options.maxValue = 8;
    }
  }
});

app.directive('clickableLabel', function() {
  return {
    restrict: 'E',
    scope: {label: '='},
    replace: true,
    template: "<button ng-click='onclick(label)' style='cursor: pointer;'>click me - {{label}}</button>",
    link: function(scope, elem, attrs) {
      scope.onclick = function(label) {
        alert("I'm " + label);
      };
    }
  };
});
