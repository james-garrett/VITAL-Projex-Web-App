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
    templateUrl: 'q1.html',
    controller: 'MainCtrl'
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

  .state('ParticipantStart', {
    url: '/ParticipantStart',
    templateUrl: 'ParticipantStart.php'
  })

  .state('AdminStart', {
    url: '/AdminStart',
    templateUrl: 'AdminStart.php'
  })

  .state('debugMenu', {
    url: '/debugMenu',
    templateUrl: 'debugMenu.php'
  });

  $urlRouterProvider.otherwise('/');  
});



app.controller('MainCtrl', 
	['$rootScope','$scope','$timeout', '$uibModal', 'SurveyQuestionForm', 
		function($rootScope, $scope, $timeout, $uibModal, SurveyQuestionForm) {
  $scope.form = null;

  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };

  $scope.valueQuestion = new Array(0);

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
  // $scope.questionsPath = "../questions.json";
  $scope.loadJSON = function() {
    var returnJSON = [];
    $.getJSON("json/questions.json", function(json) {
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

  // $scope.storedValue = '';
  //Slider with ticks values and legend
  // $scope.slider_ticks_legend = SurveyQuestionForm.slider_ticks_legend;
  
  redrawSlider = function(slider) {
    slider.refreshSlider = function () {
    $timeout(function () {
        $broadcast('rzSliderForceRender');
      });
    };
  }

  $scope.slider_ticks_legend = {
    value: 4,
    options: {
      showTicksValues: true,
      ceil: 7,
      floor: 1,

      stepsArray: [
        {value: 1, legend: 'ach'},
        {value: 2, legend: 2},
        {value: 3, legend: 3},
        {value: 4, legend: 4},
        {value: 5, legend: 5},
        {value: 6, legend: 6},
        {value: 7, legend: 7}
        
      ],
      getPointerColor: function(value) {
        if(start == true) {
            start = false;
            return;
        }
        switch(value) {
          
          case 1:
            gemColor = 'green';
            break;
          
          case 2:
            gemColor = 'green';
            break;
          
          case 3:
            gemColor = 'blue';
            break;

          case 4:
            gemColor = 'blue';
            break;

          case 5:
            gemColor = 'blue';
            break;

          case 6:
            gemColor = 'purple';
            break;

          case 7:
            gemColor = 'purple';
            break;


          default:
            console.log("Starting off");
            break;
        }
        // console.log($scope.gemColor);
        // var pointer = document.getElementsByClassName("rz-pointer.rz-pointer-min.rz:active");
        // console.log(pointer);
        // console.log(questionSelectedIndex, DefinitionArray[questionSelectedIndex]);
        // changeGemLabel(value, false, DefinitionArray[questionSelectedIndex]);
        return gemColor;
      }
    }
      
  };
  console.log($scope.slider_ticks_legend.options.stepsArray);

  $scope.loadForm = function(index, array, title) {
    console.log(index, array, typeof title);
    // SurveyQuestionForm.slider_ticks_legend = $scope.slider_ticks_legend;
    $scope.form = new SurveyQuestionForm(index, array, title, $scope.slider_ticks_legend);
    redrawSlider($scope.slider_ticks_legend);
  }

}]);

app.factory('SurveyCreator', ['$rootScope', '$http', function($http) {

  var SurveyCreator = function() {
      this.initialize = function() {
      
      };
      this.initialize();
  }

  return SurveyCreator;

}]);

app.factory('SurveyQuestionForm', ['$rootScope', '$http', function($rootScope, $http) {
  

  var SurveyQuestionForm = function(questionNumber, questionJSONData, QuestionHeading, slider) {
      this.initialize = function() {
          qData = questionJSONData;
          console.log(questionJSONData, typeof QuestionHeading, QuestionHeading);
          location.href='#/first';
          setQuestionSelected(questionNumber);
          setLegend(questionJSONData, slider);
          setDefinition(questionJSONData);
          // console.log($scope.DefinitionArray);
          // console.log(DefinitionArray, LegendArray);
          // console.log(document.getElementById("questionHeading").innerText);

          // console.log("window loaded");
          document.getElementById("valueExplanation").innerText = "Where would you be on this scale?";
          // console.log(document.getElementById("valueExplanation").innerText);
          changeGemLabel(4 , true, DefinitionArray);
          document.getElementById("questionHeading").innerText = QuestionHeading;
          // redrawSlider();
          
      };
      this.initialize();

    };


  changeGemLabel = function(value, init, description) {
    // console.log(value, $scope.DefinitionArray[value-1]);
    
    // console.log(description);
    console.log(value);
    var gem = document.getElementsByClassName("gem");
    var gemTxt = document.getElementById("actionLabel");
    var gemTxt2 = document.getElementById("subGemLabel");
    var gemTxt3 = document.getElementById("subGemLabel2");
    var descContainer = document.getElementById("valueExplanation");
    console.log(gemTxt);
    console.log(descContainer);
    
    if(!init) {
      gem[0].style.fill= gemColor;
      gem[0].style.stroke= gemColor;
      gemTxt = description;
      console.log(description, DefinitionArray[value-1]);
      if(description.length > 14) {
        var split = description.match(/.{1,14}/g);
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

    } else {
      console.log(DefinitionArray[4]);
      // description = $scope.DefinitionArray[4];
    }

    console.log(value);
    descContainer.innerText = description;
    storeAnswer(description);
  }

  storeAnswer = function(answer) {
    sessionStorage.setItem("Q1", answer); /*Store answer*/
    console.log(sessionStorage.getItem("Q1"));
  }

//   //Minimal slider config
//   minSlider = {
//     value: 10
// };
  questionSelectedIndex = -1;
  valueQuestion = new Array(0);
  gemColor = 'purple';
  gemValueText = 'purple';
  start = true;
  DefinitionArray = [
      ['You Lie; You are Dishonest; You are Untrustworthy', 'untruthful; unfair; corrupt'],
      ['You Cheat; You Deceive', 'avoids consequences; rumours; exaggerate answers'],
      ['You tell White Lies', 'tell minor lies to avoid hurting someones feelings'],
      ['You are Honest', 'Everything said is right and true and considerate; trustworthy; genuine; reliable'],
      ['You are Honest but...', 'inconsiderate; insensitive; tactless; inappropriate; too modest'],
      ['You Gossip', 'true but destructive to relationships'],
      ['You are Hard Hearted or Idealistic', 'Honest but cruel; Unrealistically aiming for perfection']];

  LegendArray = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8'];

  toggleGroup = function(group) {
    if (isGroupShown(group)) {
      shownGroup = null;
    } else {
      shownGroup = group;
    }
  };
  isGroupShown = function(group) {
    return shownGroup === group;
  };

  storedValue = '';

  // console.log(slider_ticks_legend);
  setQuestionSelected = function(index){
    // console.log("Index selected:" + index);
    
    questionSelectedIndex = index;
    
  }

  redrawSlider = function() {
    slider.refreshSlider = function () {
    $timeout(function () {
        $broadcast('rzSliderForceRender');
      });
    };
  }

  setLegend = function(array, slider) {
    // console.log(array.value);
    console.log(slider.options.stepsArray);
    for(x = 0; x < array.value.length; x++) {
      console.log(slider.options.stepsArray[x].legend);
      LegendArray[x] = array.value[x].name;
      slider.options.stepsArray[x].legend = array.value[x].name;
    }
    redrawSlider(slider);
    console.log(slider.options.stepsArray);
    // console.log($rootScope.$on().slider_ticks_legend.options.stepsArray);
  }

  setDefinition = function(array) {
    // console.log(array.value);
    for(x = 0; x < array.value.length; x++) {
      // console.log(array.value[x].definition);
      DefinitionArray[x] = array.value[x].definition;
    }
    // console.log($scope.DefinitionArray);
  }

  storeAnswer = function(answer) {
    sessionStorage.setItem("Q1", answer); /*Store answer*/
    console.log(sessionStorage.getItem("Q1"));
  }

  toggleHighValue = function() {
    if (slider_all_options.maxValue != null) {
      slider_all_options.maxValue = undefined;
    } else {
      slider_all_options.maxValue = 8;
    }
  }

  return SurveyQuestionForm;

}]);

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

//Use $rootScope to contain data from multiple controllers --> each controller should be for each state
//https://forum.ionicframework.com/t/multiple-controllers-per-view-global-app-controller-wtf-is-a-controller/1070/2
