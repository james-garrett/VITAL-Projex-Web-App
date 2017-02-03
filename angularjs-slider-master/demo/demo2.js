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

  .state('menu', {
    url: '/menu',
    templateUrl: 'menu.html'
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
// Below is just a JSON template of what data a question should hold
  // $scope.valueQuestion = $.getJSON("questions.json", function(json) {
  //   console.log($scope.valueQuestion);
  // })

  $scope.gemColor = 'purple';
  $scope.gemValueText = 'purple';
  $scope.start = true;
  $scope.Q1LegendArray = [
      ['You Lie; You are Dishonest; You are Untrustworthy', 'untruthful; unfair; corrupt'],
      ['You Cheat; You Deceive', 'avoids consequences; rumours; exaggerate answers'],
      ['You tell White Lies', 'tell minor lies to avoid hurting someones feelings'],
      ['You are Honest', 'Everything said is right and true and considerate; trustworthy; genuine; reliable'],
      ['You are Honest but...', 'inconsiderate; insensitive; tactless; inappropriate; too modest'],
      ['You Gossip', 'true but destructive to relationships'],
      ['You are Hard Hearted or Idealistic', 'Honest but cruel; Unrealistically aiming for perfection']];

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };


  $scope.storedValue = '';

  //Slider with ticks values and legend
  $scope.slider_ticks_legend = {
    value: 4,
    options: {
      showTicksValues: true,
      ceil: 7,
      floor: 1,

      stepsArray: [
        // {value: 1, legend: 'Lie; Dishonest; Untrustworthy'},
        // {value: 2, legend: 'Cheat; Deceive'},
        // {value: 3, legend: 'White Lies'},
        // {value: 4, legend: 'Honest'},
        // {value: 5, legend: 'Honest but...'},
        // {value: 6, legend: 'Gossip'},
        // {value: 7, legend: 'Hard Hearted or Idealistic'},
        {value: 1, legend: 'Dishonest'},
        {value: 2, legend: 'Cheat'},
        {value: 3, legend: 'White Liar'},
        {value: 4, legend: 'Honest'},
        {value: 5, legend: 'Honest but...'},
        {value: 6, legend: 'Gossip'},
        {value: 7, legend: 'Idealistic'},
        
      ],
      getPointerColor: function(value) {
        if($scope.start == true) {
            $scope.start = false;
            return;
        }
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


          default:
            console.log("Starting off");
            break;
        }
        // console.log($scope.gemColor);
        $scope.changeGemLabel(value);
        var pointer = document.getElementsByClassName("rz-pointer rz-pointer-min rz:active");
        // console.log(pointer);

        // document.getElementsByClassName("rz-pointer rz-pointer-min")[0].style.backgroundColor= "red";
        //
        // "Pointer" actually returns an array where the first element is the actual pointer!
        // pointer.style.backgroundColor=$scope.gemColor;
        // pointer.setStyle({fillColor: '#dddddd'})
        // pointer.style.fill="red";
        return $scope.gemColor;
      }
    }
      
  };

  $scope.changeGemLabel = function(value) {
    // console.log(value, $scope.Q1LegendArray[value-1]);
    console.log(value);
    var gem = document.getElementsByClassName("gem");
    var gemTxt = document.getElementById("gemLabel");
    var gemTxt2 = document.getElementById("subGemLabel");
    var gemTxt3 = document.getElementById("subGemLabel2");

    var desc = document.getElementById("valueExplanation");
    console.log(gem);
    // gem[0].style.fill= "blue";
    gem[0].style.fill= $scope.gemColor;
    // gem.fill = '#000000';
    // gem.setAttribute("fill", $scope.gemValueText);
    var val = $scope.Q1LegendArray[value-1][0];
    console.log(val.length);
    if(val.length > 14) {
        var split = val.match(/.{1,14}/g);
        console.log(split);
        gemTxt.textContent = split[0];
        gemTxt2.textContent = split[1];
        if(split.length > 2) {
          gemTxt3.textContent = split[2];
        }

        // Need for loop for larger split arrays that also make the containing gem larger
    } else {
      gemTxt.textContent = $scope.Q1LegendArray[value-1][0];
      gemTxt2.textContent = '';
      gemTxt3.textContent = '';
    }
    desc.innerText = $scope.Q1LegendArray[value-1][1];
    $scope.storeAnswer($scope.Q1LegendArray[value-1][1]);
  }

  $scope.storeAnswer = function(answer) {
    sessionStorage.setItem("Q1", answer); /*Store answer*/
    console.log(sessionStorage.getItem("Q1"));
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
