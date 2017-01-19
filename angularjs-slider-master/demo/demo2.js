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

  $scope.gemColor = 'purple';
  $scope.gemValueText = 'purple';
  $scope.Q1LegendArray = [
      'Lie; Dishonest; Untrustworthy',
      'Cheat; Deceive',
      'White Lies',
      'Honest',
      'Honest but...',
      'Gossip',
      'Hard Hearted or Idealistic'];
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
        
        switch(value) {
          case 1:
            
            $scope.gemColor = 'green';
            break;
          
          case 2:
            $scope.gemColor = 'green';
            break;
          
          case 3:
            $scope.gemColor = 'blue';
            break;

          case 4:
            $scope.gemColor = 'blue';
            break;

          case 5:
            $scope.gemColor = 'blue';
            break;

          case 6:
            $scope.gemColor = 'purple';
            break;

          case 7:
            $scope.gemColor = 'purple';
            break;
        }
        // $scope.gemValueText = legend;
        // console.log($scope.gemValueText);
        // console.log(stepsArray[value++]);
        // console.log($scope.gemColor);
        $scope.changeGemLabel(value);
        return $scope.gemColor;
      }
    }
      
  };

  $scope.changeGemLabel = function(value) {
    console.log(value, $scope.Q1LegendArray[value-1]);
    var gem = document.getElementsByClassName("gem");
    // console.log(gem.[0]);
    // gem.style.fill="yellow";
    gem.fill = '#000000';
    // gem.setAttribute("fill", $scope.gemValueText);
    var gemTxt = document.getElementById("gemLabel");
    gemTxt.textContent='You are ' + $scope.Q1LegendArray[value-1];

  }

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
