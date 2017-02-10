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

  $scope.questionSelectedIndex = -1;
  $scope.valueQuestion = new Array(0);
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

<<<<<<< HEAD
  $scope.LegendArray = new Array(0);
=======
  $scope.LegendArray = [
    'Dishonest',
    'Cheat',
    'White Liar',
    'Honest',
    'Honest but...',
    'Gossip',
    'Idealistic'];
>>>>>>> d1dfd7f7c8154a63f7089b06536d5ceca5d47e06

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

  // Below is just a JSON template of what data a question should hold
  $scope.loadJSON = function() {
    var returnJSON = [];
    $.getJSON("questions.json", function(json) {
      $.each(json.Questions, function(k, v) {
        // console.log(k, v);
      })
        $scope.valueQuestion.push(json.Questions);
      // $scope.valueQuestion = json.Questions[0].Question;
      // return json;
    });
    // console.log($scope.valueQuestion);   
  }

  $scope.loadJSON();
  console.log($scope.valueQuestion);
<<<<<<< HEAD
  // console.log($scope.valueQuestion[0]);
=======
  console.log($scope.valueQuestion[0]);

  $scope.setQuestionSelected = function(index){
    console.log("Index selected:" + index);
    location.href='#/first';
    $scope.questionSelectedIndex = index;
    $scope.changeGemLabel($scope.gemColor, true);
    // $scope.questionHeading = document.getElementById("questionHeading");
    console.log($scope.valueQuestion[$scope.questionSelectedIndex].Question);
    // $scope.questionHeading.innerText = $scope.valueQuestion[$scope.questionSelectedIndex].Question;
    // $scope.quest
  }
>>>>>>> d1dfd7f7c8154a63f7089b06536d5ceca5d47e06

  $scope.storedValue = '';

  //Slider with ticks values and legend
  $scope.slider_ticks_legend = {
    value: 4,
    options: {
      showTicksValues: true,
      ceil: 7,
      floor: 1,

      stepsArray: [
        {value: 1, legend: $scope.LegendArray[0]},
        {value: 2, legend: $scope.LegendArray[1]},
        {value: 3, legend: $scope.LegendArray[2]},
        {value: 4, legend: $scope.LegendArray[3]},
        {value: 5, legend: $scope.LegendArray[4]},
        {value: 6, legend: $scope.LegendArray[5]},
        {value: 7, legend: $scope.LegendArray[6]},
        
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
<<<<<<< HEAD
        $scope.changeGemLabel(value, false, $scope.LegendArray);
=======
        $scope.changeGemLabel(value, false);
>>>>>>> d1dfd7f7c8154a63f7089b06536d5ceca5d47e06
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

<<<<<<< HEAD
  $scope.loadForm = function(index, array, title) {
    // console.log(array, typeof title);
    location.href='#/first';
    $scope.setQuestionSelected(index);
    $scope.setLegend(array);
    document.getElementById("questionHeading").innerText = title;
    $scope.changeGemLabel(index , true, array);
  }

  $scope.setQuestionSelected = function(index){
    // console.log("Index selected:" + index);
    
    $scope.questionSelectedIndex = index;
    
    // $scope.questionHeading = document.getElementById("questionHeading");
    // console.log($scope.valueQuestion[$scope.questionSelectedIndex].Question);
    // $scope.questionHeading.innerText = $scope.valueQuestion[$scope.questionSelectedIndex].Question;
    // $scope.quest
  }

  $scope.setLegend = function(array) {
    console.log(array.value);
    for(x = 0; x < array.length; x++) {
      console.log(array.value[x]);
      $scope.LegendArray[x] = array.value[x].definition;
    }
    console.log($scope.LegendArray);
  }

  $scope.changeGemLabel = function(value, init, descriptionArray) {
    // console.log(value, $scope.Q1LegendArray[value-1]);
    
=======
  $scope.setLegend = function(index, array) {
    for(x = 0; x < array.length) {
      $scope.LegendArray[i] = array[i];
    }
  }

  $scope.changeGemLabel = function(value, init) {
    // console.log(value, $scope.Q1LegendArray[value-1]);
    setLegend()
>>>>>>> d1dfd7f7c8154a63f7089b06536d5ceca5d47e06
    console.log(value);
    var gem = document.getElementsByClassName("gem");
    var gemTxt = document.getElementById("gemLabel");
    var gemTxt2 = document.getElementById("subGemLabel");
    var gemTxt3 = document.getElementById("subGemLabel2");
    var descContainer = document.getElementById("valueExplanation");
    console.log(descriptionArray[4].action);
    // console.log($scope.LegendArray);
    console.log(gemTxt);
    // console.log(gem[0]);
    // console.log(gemTxt);
    // gem[0].style.fill= "blue";
<<<<<<< HEAD
    var description = "You are honest";
    if(!init) {
      gem[0].style.fill= $scope.gemColor;
      gem[0].style.stroke= $scope.gemColor;
      $scope.LegendArray = descriptionArray;
      console.log(value, descriptionArray[value-1].action);
      description = descriptionArray[value-1].action;

    } else {
      description = descriptionArray[4].action;
=======
    if(!init) {
      gem[0].style.fill= $scope.gemColor;
      gem[0].style.stroke= $scope.gemColor;
>>>>>>> d1dfd7f7c8154a63f7089b06536d5ceca5d47e06
    }
    // gem.fill = '#000000';
    // gem.setAttribute("fill", $scope.gemValueText);
    // var legend = $scope.valueQuestion[$scope.questionSelectedIndex].ValueOptions;
    // for(x = 0; x < legend.length; x++)
    // $scope.valueQuestion[$scope.questionSelectedIndex].ValueOptions.value.name;
<<<<<<< HEAD
    // var val = $scope.LegendArray;
    // console.log(val, val.length);
    console.log(description);
    console.log(gemTxt.textContent);
    gemTxt.textContent = description;
    if(description.length > 14) {
        var split = description.match(/.{1,14}/g);
=======
    // var val = $scope.Q1LegendArray[value-1][0];
    console.log(val.length);
    if(val.length > 14) {
        var split = val.match(/.{1,14}/g);
>>>>>>> d1dfd7f7c8154a63f7089b06536d5ceca5d47e06
        console.log(split);
        gemTxt.textContent = split[0];
        gemTxt2.textContent = split[1];
        if(split.length > 2) {
          gemTxt3.textContent = split[2];
        }

        // Need for loop for larger split arrays that also make the containing gem larger
    } else {
      gemTxt.textContent = description;
      gemTxt2.textContent = '';
      gemTxt3.textContent = '';
    }
    descContainer.innerText = description;
    $scope.storeAnswer(description);
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
