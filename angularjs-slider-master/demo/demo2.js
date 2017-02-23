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
    controller: 'FormController'
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
  });

  $urlRouterProvider.otherwise('/');  
});



app.controller('MainCtrl', ['$rootScope','$scope','$timeout', '$uibModal', 'SurveyQuestionForm', function($scope, $rootScope, $timeout, $uibModal) {
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

  // $scope.storedValue = '';


  $scope.loadForm = function(index, array, title) {
    $scope.form = new SurveyQuestionForm(index, array, title);
    // console.log(array, typeof title);
    // $scope.setQuestionSelected(index);
    // $scope.setLegend(array);
    // $scope.setDefinition(array);
    // console.log(document.getElementsByClassName("formHeading"));
    // $scope.changeGemLabel(4 , true, $scope.DefinitionArray);
    // document.getElementById("questionHeading").innerText = title;
  }

}]);

app.factory('SurveyQuestionForm', function($http) {
  
  var SurveyQuestionForm = function(questionNumber, questionJSONData, QuestionHeading) {
      this.initialize = function() {
          console.log(questionJSONData, typeof title);
          location.href='#/first';
          $scope.setQuestionSelected(questionNumber);
          $scope.setLegend(questionJSONData);
          $scope.setDefinition(questionJSONData);
          // console.log($scope.DefinitionArray);
          console.log(document.getElementsByClassName("formHeading"));
          $scope.changeGemLabel(4 , true, $scope.DefinitionArray);
          document.getElementById("questionHeading").innerText = QuestionHeading;
      };
      this.initialize();
    };

  // $scope.formInit = function() {
  //   console.log(questionJSONData, typeof title);
    
  //   location.href='#/first';
  //   $scope.setQuestionSelected(questionNumber);
  //   $scope.setLegend(questionJSONData);
  //   $scope.setDefinition(questionJSONData);
  //   // console.log($scope.DefinitionArray);
  //   console.log(document.getElementsByClassName("formHeading"));
  //   $scope.changeGemLabel(4 , true, $scope.DefinitionArray);
  //   document.getElementById("questionHeading").innerText = QuestionHeading;

  // }

  $scope.changeGemLabel = function(value, init, description) {
    // console.log(value, $scope.DefinitionArray[value-1]);
    
    // console.log(description);
    console.log(value);
    var gem = document.getElementsByClassName("gem");
    var gemTxt = document.getElementById("actionLabel");
    var gemTxt2 = document.getElementById("subGemLabel");
    var gemTxt3 = document.getElementById("subGemLabel2");
    var descContainer = document.getElementById("valueExplanation");
    console.log(gemTxt);
    
    if(!init) {
      gem[0].style.fill= $scope.gemColor;
      gem[0].style.stroke= $scope.gemColor;
      gemTxt = description;
      console.log(description, $scope.DefinitionArray[value-1]);
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
      console.log($scope.DefinitionArray[4]);
      // description = $scope.DefinitionArray[4];
    }

    console.log(value);
    descContainer.innerText = description;
    $scope.storeAnswer(description);
  }

  $scope.storeAnswer = function(answer) {
    sessionStorage.setItem("Q1", answer); /*Store answer*/
    console.log(sessionStorage.getItem("Q1"));
  }

  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };

  $scope.questionSelectedIndex = -1;
  $scope.valueQuestion = new Array(0);
  $scope.gemColor = 'purple';
  $scope.gemValueText = 'purple';
  $scope.start = true;
  $scope.DefinitionArray = [
      ['You Lie; You are Dishonest; You are Untrustworthy', 'untruthful; unfair; corrupt'],
      ['You Cheat; You Deceive', 'avoids consequences; rumours; exaggerate answers'],
      ['You tell White Lies', 'tell minor lies to avoid hurting someones feelings'],
      ['You are Honest', 'Everything said is right and true and considerate; trustworthy; genuine; reliable'],
      ['You are Honest but...', 'inconsiderate; insensitive; tactless; inappropriate; too modest'],
      ['You Gossip', 'true but destructive to relationships'],
      ['You are Hard Hearted or Idealistic', 'Honest but cruel; Unrealistically aiming for perfection']];

  $scope.LegendArray = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8'];

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

  // $scope.loadJSON();
  // console.log($scope.valueQuestion);
  // console.log($scope.valueQuestion[0]);

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
        var pointer = document.getElementsByClassName("rz-pointer.rz-pointer-min.rz:active");
        console.log(pointer);
        // document.getElementsByClassName("rz-pointer rz-pointer-min")[0].style.backgroundColor= "red";
        //
        // "Pointer" actually returns an array where the first element is the actual pointer!
        // pointer.style.backgroundColor=$scope.gemColor;
        // pointer.setStyle({fillColor: '#dddddd'})
        // pointer.style.fill="red";
        console.log($scope.questionSelectedIndex, $scope.DefinitionArray[$scope.questionSelectedIndex]);
        $scope.changeGemLabel(value, false, $scope.DefinitionArray[$scope.questionSelectedIndex]);
        return $scope.gemColor;
      }
    }
      
  };


  $scope.setQuestionSelected = function(index){
    // console.log("Index selected:" + index);
    
    $scope.questionSelectedIndex = index;
    
    // $scope.questionHeading = document.getElementById("questionHeading");
    // console.log($scope.valueQuestion[$scope.questionSelectedIndex].Question);
    // $scope.questionHeading.innerText = $scope.valueQuestion[$scope.questionSelectedIndex].Question;
    // $scope.quest
  }

  $scope.redrawSlider = function() {
    $scope.slider_ticks_legend.refreshSlider = function () {
    $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };
  }

  $scope.setLegend = function(array) {
    // console.log(array.value);
    for(x = 0; x < array.value.length; x++) {
      // console.log(array.value[x].name);
      $scope.LegendArray[x] = array.value[x].name;
      $scope.slider_ticks_legend.options.stepsArray[x] = array.value[x].name;
    }
    $scope.redrawSlider();
    // console.log($scope.LegendArray);
  }

  $scope.setDefinition = function(array) {
    // console.log(array.value);
    for(x = 0; x < array.value.length; x++) {
      // console.log(array.value[x].definition);
      $scope.DefinitionArray[x] = array.value[x].definition;
    }
    // console.log($scope.DefinitionArray);
  }

  $scope.changeGemLabel = function(value, init, description) {
    // console.log(value, $scope.DefinitionArray[value-1]);
    
    // console.log(description);
    console.log(value);
    var gem = document.getElementsByClassName("gem");
    var gemTxt = document.getElementById("actionLabel");
    var gemTxt2 = document.getElementById("subGemLabel");
    var gemTxt3 = document.getElementById("subGemLabel2");
    var descContainer = document.getElementById("valueExplanation");
    // console.log($scope.LegendArray);
    // console.log(gem[0]);
    console.log(gemTxt);
    // gem[0].style.fill= "blue";
    // var description = "You are honest";
    
    if(!init) {
      gem[0].style.fill= $scope.gemColor;
      gem[0].style.stroke= $scope.gemColor;
      // $scope.LegendArray = $scope.DefinitionArray;
      // console.log(value, $scope.DefinitionArray[value-1]);
      // description = $scope.DefinitionArray[value-1];
      gemTxt = description;
      console.log(description, $scope.DefinitionArray[value-1]);
      // console.log(gemTxt.textContent);
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
      console.log($scope.DefinitionArray[4]);
      // description = $scope.DefinitionArray[4];
      
    }
    
    

    // gem.fill = '#000000';
    // gem.setAttribute("fill", $scope.gemValueText);
    // var legend = $scope.valueQuestion[$scope.questionSelectedIndex].ValueOptions;
    // for(x = 0; x < legend.length; x++)
    // $scope.valueQuestion[$scope.questionSelectedIndex].ValueOptions.value.name;
    // var val = $scope.LegendArray;
    // console.log(val, val.length);
    console.log(value);
    // console.log(gemTxt.textContent);
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

  return(SurveyQuestionForm);

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

//Use $rootScope to contain data from multiple controllers --> each controller should be for each state
//https://forum.ionicframework.com/t/multiple-controllers-per-view-global-app-controller-wtf-is-a-controller/1070/2
