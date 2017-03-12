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
    controller: 'QuestionController'
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

  .state('CreateSurvey', {
    url: '/CreateSurvey',
    templateUrl: 'CreateSurvey.php'
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


app.controller('QuestionForm', ['$rootScope','$scope','$timeout', '$uibModal', 'QuestionForm', 'Slider', 
  function($rootScope, $scope, $timeout, $uibModal, QuestionForm, Slider) {
    // $scope.form = null;
  $scope.$on('JSONDATA', function(event, array) {
    console.log(array);
  });
  }]);

app.service('JSONData', function() {
    var questionJSONData = new Array(0);
    // $scope.loadJSON();
    var getJSONDataFromFile = function(filename) {
        var returnJSON = [];
        $.getJSON(filename, function(json) {
          $.each(json.Questions, function(k, v) {
            // console.log(k, v);
          })
          questionJSONData.push(json.Questions);
        });
    console.log(questionJSONData);
    returnQuestionJSONData();
    }

    var returnQuestionJSONData = function() {
      return questionJSONData;
    }

    return {
      getJSONDataFromFile: getJSONDataFromFile,
      returnQuestionJSONData: returnQuestionJSONData
    };

});


app.controller('MainCtrl', 
	['$rootScope','$scope','$timeout', '$uibModal', 'JSONData',
		function($rootScope, $scope, $timeout, $uibModal, JSONData, filename) {
      
      // console.log(JSONData);
      $scope.valueQuestion = new Array(0);
      $scope.jsonData = {};
      console.log(JSONData.returnQuestionJSONData());
      // JSONData.getJSONDataFromFile('json/questions.json');
      // $scope.valueQuestion = JSONData.returnQuestionJSONData();
      console.log($scope.jsonData, JSONData.returnQuestionJSONData(), $scope.valueQuestion);
      $scope.callToGetJSONDATA = function() {
        console.log(JSONData.getJSONDataFromFile('json/questions.json'));
      }


  // $scope.callToGetJSONDATA();
  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };

  $scope.form = null;

  $scope.valueQuestion = new Array(0);
  JSONData.getJSONDataFromFile('json/questions.json');
  $scope.valueQuestion = JSONData.returnQuestionJSONData();

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
  // $scope.loadJSON = function() {
  //   var returnJSON = [];
  //   $.getJSON("json/questions.json", function(json) {
  //     $.each(json.Questions, function(k, v) {
  //       // console.log(k, v);
  //     })
  //     $scope.valueQuestion.push(json.Questions);
  //   });
  // }

  // $scope.loadJSON();

  $scope.loadForm = function(index, array, title) {
    $rootScope.$broadcast('JSONDATA', array);
    

    location.href='#/first';
    var slider = new Slider(array);
    $scope.slider_ticks_legend = slider.sliderGet();
    $scope.form = new QuestionForm(index, array, title, $scope.slider_ticks_legend);
    console.log($scope.form);
  }

}]);

app.factory('Slider', ['$rootScope', '$http', function($rootScope, $http) {
    
    var Slider = function(questionJSONData) {
      this.initialize = function() {

        this.slider_ticks_legend = {};
      // console.log(this.slider_ticks_legend);
    };
    

    this.setSlider = function(questionJSONData) {
      this.slider_ticks_legend = {
          value: 4,
          options: {
            showTicksValues: true,
            ceil: 7,
            floor: 1,

            stepsArray: [
              {value: 1, legend: questionJSONData.value[0].name},
              {value: 2, legend: questionJSONData.value[1].name},
              {value: 3, legend: questionJSONData.value[2].name},
              {value: 4, legend: questionJSONData.value[3].name},
              {value: 5, legend: questionJSONData.value[4].name},
              {value: 6, legend: questionJSONData.value[5].name},
              {value: 7, legend: questionJSONData.value[6].name}
              
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
    }

    this.sliderGet = function() {
        return this.slider_ticks_legend;
    }

    this.initialize();
    this.setSlider(questionJSONData);

  };
  return Slider;
}]);

app.factory('QuestionForm', ['$rootScope', '$http', function($rootScope, $http) {
  

  var QuestionForm = function(questionNumber, questionJSONData, QuestionHeading, slider) {
      this.initialize = function() {
          qData = questionJSONData;
          console.log(questionJSONData, typeof QuestionHeading, QuestionHeading);
          
          setQuestionSelected(questionNumber);
          setLegend(questionJSONData, slider);
          setDefinition(questionJSONData);
          // console.log($scope.DefinitionArray);
          // console.log(DefinitionArray, LegendArray);
          // console.log(document.getElementById("questionHeading").innerText);

          // console.log("window loaded");
          console.log('elem', document.getElementById("valueExplanation"));
          document.getElementById("valueExplanation").innerHTML = "fuck";
          // var val = document.getElementsByClassName("valueExplanation1");
          // val.innerText = "Where would you be on this scale?";
          // console.log(document.getElementById("valueExplanation").innerText);
          // changeGemLabel(4 , true, DefinitionArray);
          // document.getElementById("questionHeading").innerText = QuestionHeading;
          // redrawSlider();
          
      };
      this.initialize();
      console.log(window.onload);
      window.onload = alert("hi");
          
      // document.getElementById("valueExplanation").innerText = "Where would you be on this scale?";
    

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
    // console.log(slider.options.stepsArray);
    for(x = 0; x < array.value.length; x++) {
      // console.log(slider.options.stepsArray[x].legend);
      LegendArray[x] = array.value[x].name;
      slider.options.stepsArray[x].legend = array.value[x].name;
    }
    // redrawSlider(slider);
    // console.log(slider.options.stepsArray);
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

  return QuestionForm;

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
