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
    controller: 'QuestionFormCreator'
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


app.controller('MainCtrl', 
	['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 'JSONData', 
		function($rootScope, $scope, $timeout, $uibModal, AnswerListener, JSONData, filename) {
      
      $scope.valueQuestion = new Array(0);
      $scope.jsonData = {};
      $scope.callToGetJSONDATA = function() {
        console.log(JSONData.getJSONDataFromFile('json/questions.json'));
      }


  // $scope.callToGetJSONDATA();

  //upon the controller being opened, execute this function
  $scope.$on('$ionicView.afterEnter', function(){
 //run something :smile: 
    // console.log(document.getElementById("Q3Gem"));
    // console.log(document.getElementById("Q1gemLabel"));
    // console.log(document.getElementById("Q3gemLabel"));
    // console.log("onMainCtrl open function trigger");
    // console.log("AnswerIndex:" + AnswerListener.getInputValue());
    $scope.drawBigHex();
    if(AnswerListener.getInputValue() != -1 && AnswerListener.getQuestionAnswered()) {
      // AnswerListener.clearAnswerListener();  
      
      // console.log(JSONData.getIndex());
      // var elem_Name = "shapeContainer > svg.environments-image" + JSONData.getIndex();
      var text_elem_Name = "Q" + JSONData.getIndex() + "gemLabel";
      var poly_elem_Name = "environments-image" + JSONData.getIndex();
      // console.log(elem_Name, typeof elem_Name);
      $scope.changeCompletedGem(JSONData.getIndex(), 
                                  AnswerListener.getInputValue(), 
                                  document.getElementById(poly_elem_Name),
                                  document.getElementById(text_elem_Name));
      AnswerListener.setQuestionAnswered(false);
    } 
    // console.log(typeof sessionStorage.getItem("Q1"));
  });

  $scope.changeCompletedGem = function(gemIndex, answerIndex, polyElem, textElem) {
    // console.log(gemIndex, answerIndex, polyElem, textElem, "Elem has label") ;
    // console.log(JSONData.returnQuestionJSONData()[0][gemIndex].ValueOptions.value[answerIndex-1].action);
    textElem.innerText = "fuck";
    textElem.textContent = JSONData.returnQuestionJSONData()[0][gemIndex].ValueOptions.value[answerIndex-1].action;
    // console.log(JSONData.returnQuestionJSONData());
    // textElem.innerText = 
    // console.log(polyElem.innerText);
  }

  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };

  $scope.form = null;

  $scope.valueQuestion = new Array(0);
  JSONData.getJSONDataFromFile('json/questions.json');
  $scope.valueQuestion = JSONData.returnQuestionJSONData();

  $scope.hexArr = new Array(0);
  $scope.hexArr = [{x: 0,y: 300}, {x: 150, y: 225}, {x: 280, y: 75}, {x: 280, y: 0}, {x: 150, y: 75}, {x: 20, y:225}, {x: 0, y:20}];
  
  $scope.getCoord = function(index) {
  
    // console.log({ transform: translate(hexArr[index], hexArr[index + 1]) });
    // console.log($("#shapeContainer").width(), $("#shapeContainer").height());
    var elem = document.getElementById("shapeContainer");
    console.log("width: ", window.getComputedStyle(elem).width, " height: ", window.getComputedStyle(elem).height);
    console.log(document.getElementById("shapeContainer").clientWidth, document.getElementById("shapeContainer").clientHeight);
    console.log(document.getElementById("shapeContainer").offsetWidth, document.getElementById("shapeContainer").offsetHeight);
    console.log($scope.getPolyGon($("#shapeContainer").width(), $("#shapeContainer").height())[index].x);
    return {"left": $scope.getPolyGon($("#shapeContainer").width(), $("#shapeContainer").height())[index].x, 
            // "right": $scope.getPolyGon($("#shapeContainer").width(), $("#shapeContainer").height())[index].x, 
            "top": $scope.getPolyGon($("#shapeContainer").width() , $("#shapeContainer").height())[index].y -100,
            // "bottom": $scope.getPolyGon($("#shapeContainer").width() , $("#shapeContainer").height())[index].y,
            "position": "absolute",
            // "display": "block"
            // "float": "left"
          };
  }

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

  $scope.loadForm = function(index, array, title) {
    // console.log(index);
    JSONData.setIndex(index);
    location.href='#/first';
  } 


  // console.log($scope.valueQuestion.length);



    //load data
  // var c = document.getElementById('canvas').getContext('2d');

  $scope.getPolyGon = function (drawingAreaWidth, drawingAreaHeight) {
    // var c= document.getElementsByClassName("hexCanvas")[0];
    // console.log(c);
    // var hex = $("#hexCanvas");
    // var c = hex.getContext("2d");
    var width = drawingAreaWidth;
    // var width = 800;
    var height = drawingAreaHeight;
    // var height = 400;
    // console.log(width, height);
    var corners = 5;
    // console.log($scope.valueQuestion, width, height);
    //initial calculation
    var radius = 1;
    var angle = (Math.PI * 2) / corners;

    //build points 
    var points = [];
    for (var i=0; i<corners; i++) {
        a = angle * i;
        //sin and cos are swithced,point 0 is bottom one
        // Adjusting these vals makes cluster tighter
        var x = ((Math.sin(a)*radius) -5);
        var y = (Math.cos(a)*radius);
        points.push({
            x:x
            ,y:y
        })
    } 

    // console.log(points);

    //get the angle of a side
    var sideangle = Math.atan2(points[1].y-points[0].y, points[1].x-points[0].x)
    //rotate point around bottom one
    var o = points[0];
    for (var i=1; i<points.length; i++)
    {
        points[i] = {
            x:Math.cos(sideangle) * (points[i].x - o.x) - Math.sin(sideangle) * (points[i].y-o.y) + o.x
            ,y:Math.sin(sideangle) * (points[i].x - o.x) + Math.cos(sideangle) * (points[i].y - o.y) + o.y
        };
    }
    //by this point the figure is "flat on the floor" lets measure its size
    var rect = {top:2,left:2,right:-2,bottom:-2};

    // console.log(points);

    for (var i=0; i<points.length; i++)
    {
        rect.top = Math.min(rect.top,points[i].y);
        rect.bottom = Math.max(rect.bottom,points[i].y);
        rect.left = Math.min(rect.left,points[i].x);
        rect.right = Math.max(rect.right,points[i].x);
    }
    rect.width = Math.abs(rect.right - rect.left);
    rect.height = Math.abs(rect.bottom - rect.top);
    //make points relative to top left of rect
    for (var i=0; i<points.length; i++)
    {
        points[i] = {
            x: points[i].x - rect.left
            ,y: points[i].y - rect.top
        };
    }
    //lets scale and position the poly based on its rect
    var ratioX = width / rect.width
    var ratioY = height / rect.height
    var ratio = Math.min(ratioX, ratioY);

    // console.log(points);

    for (var i=0; i<points.length; i++)
    {

        //Adjusting these figures displaces the object array appropriately
        points[i] = {
            x: ((points[i].x * ratio) + drawingAreaWidth/4) 
            ,y: ((points[i].y * ratio) + drawingAreaHeight*0.2)
        };
    }


    return points;
  }

  // $scope.getPolyGon();
  $scope.setHexCanvasStyle = function(hex, shapeContainer) {
    console.log(shapeContainer.width())
    hex.style.width = shapeContainer.width();
    hex.style.height = shapeContainer.height();
    hex.width = hex.offSetWidth;
    hex.height = hex.offSetHeight;
    return hex;
  }

  $scope.drawBigHex = function() {
    console.log("shapeContainer dims:", $("#shapeContainer").width(), $("#shapeContainer").height()) ;
    var hex= document.getElementById("hexCanvas");
    var shapeContainer = document.getElementById("shapeContainer");
    console.log("hexCanvas dims:", $("#hexCanvas").width(), $("#hexCanvas").height());
    // $scope.setHexCanvasStyle(hex, $("#shapeContainer"));
    var c = hex.getContext("2d");
    c.width = shapeContainer.innerWidth;
    c.height = shapeContainer.innerHeight;
    var points = $scope.getPolyGon($("#hexCanvas").width(), $("#hexCanvas").height());
    // var points = $scope.getPolyGon(300, 300);
    console.log("start at ", points[0].x, points[0].y);
    // document.getElementById("bigPoly").setAttribute("points", "100,0 50,0 100,100");
    // console.log($("#Q1gem")[0].points);
    // c.beginPath();              
    // c.lineWidth = "5";
    // c.strokeStyle = "green";  // Green path
    // // c.moveTo(200, 0);
    // c.moveTo(points[0].x/2, points[0].y/2);
    // // c.moveTo(0, 31);
    // c.lineTo(points[1].x/2, points[1].y/2);
    // c.stroke();  
    // c.closePath();
    // Draw it



    c.beginPath();
    c.lineWidth="5";
    c.strokeStyle="green";
          
    console.log(points, $scope.getPolyGon($("#shapeContainer").width() , $("#shapeContainer").height()));
    //draw path
    
      c.beginPath();
      c.moveTo(points[0].x, points[0].y);
      for(var i = 1; i < points.length; i++) {
        console.log(i, "Move to", points[i-1].x, points[i-1].y, " Line to", points[i].x, points[i].y)
        
        c.lineTo(points[i].x, points[i].y);
      }
      c.strokeStyle = "#000000";
      c.lineWidth = "0";
      c.stroke();
      c.fill();
      c.closePath();
    
    // 
    //draw
    
  }



}]);

app.controller('QuestionFormCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 'QuestionForm', 'Slider', 'JSONData',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, QuestionForm, Slider, JSONData) {
    // $scope.form = null;
      $scope.init = function() {
        var array = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()];
        // console.log(array);
        document.getElementById("questionHeadingOnForm").innerText = array.Question;
        var qNum = JSONData.getIndex();
        var slider = new Slider(array);
        $scope.slider_ticks_legend = slider.sliderGet();
        AnswerListener.setInputValue(4);
        console.log(AnswerListener.getInputValue());
        $scope.form = new QuestionForm(JSONData.getIndex(), array, array.Question, $scope.slider_ticks_legend);
        // console.log($scope.form);
        
      } 
    // $scope.init();
    
    


      $scope.$on('JSONDATA', function(event, array) {
        console.log(array);
      });
  }]);

app.factory('Slider', ['$rootScope', '$http', 'AnswerListener', 'JSONData', function($rootScope, $http, AnswerListener, JSONData) {
    
    var Slider = function(questionJSONData) {
      this.initialize = function() {

        this.slider_ticks_legend = {};

    };


    this.slider_ticks_legend = {};

    changeGemColor = function(gemColor) {

      var gem = document.getElementsByClassName("gem")[0];
      gem.style.fill= gemColor;

      gem.style.stroke= gemColor;
    }

    changeGemDefinition = function(value) {
       document.getElementsByClassName("valueExplanation")[0].innerHTML = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[value-1].definition;
    }

    backToMenu = function() {
      console.log("triggered", AnswerListener.getInputValue(), typeof AnswerListener.getInputValue());
      storeAnswer(AnswerListener.getInputValue());
      AnswerListener.setQuestionAnswered(true);
      location.href='#/menu';
    }

    storeAnswer = function(answer) {
      // console.log(answer);
      sessionStorage.setItem("Q1", answer); /*Store answer*/
      console.log(sessionStorage.getItem("Q1"));
    }

    changeGemLabel = function(value) {
      var gemTxt = document.getElementById("gemLabel");
      

      var description = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[value-1].action;
      
      // document.getElementById("subGemLabel2").textContent = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[value-1].action;
      
      // console.log(description, DefinitionArray[value-1]);
      if(description.length > 14) {
        var split = description.match(/.{1,14}/g);
        // console.log(split);
        document.getElementById("gemLabel").textContent = split[0];
        document.getElementById("subGemLabel21").textContent =split[1];
        // console.log(split.length);
        if(split.length > 2) {
          document.getElementById("subGemLabel22").textContent = split[2];
        } else {
          document.getElementById("subGemLabel22").textContent = '';

        }
        // Need for loop for larger split arrays that also make the containing gem larger
        } else {
          document.getElementById("gemLabel").textContent = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[value-1].action;
          document.getElementById("subGemLabel21").textContent = '';
          document.getElementById("subGemLabel22").textContent = '';
        }
    }

    this.setSlider = function(questionJSONData) {
      this.slider_ticks_legend = {
          value: 4,
          options: {
            showTicksValues: true,
            ceil: 7,
            floor: 1,

            stepsArray: [
              {value: 1, legend: questionJSONData.ValueOptions.value[0].name},
              {value: 2, legend: questionJSONData.ValueOptions.value[1].name},
              {value: 3, legend: questionJSONData.ValueOptions.value[2].name},
              {value: 4, legend: questionJSONData.ValueOptions.value[3].name},
              {value: 5, legend: questionJSONData.ValueOptions.value[4].name},
              {value: 6, legend: questionJSONData.ValueOptions.value[5].name},
              {value: 7, legend: questionJSONData.ValueOptions.value[6].name}
              
            ],

            // onChange: this.onChangeListener,

            getPointerColor: function(value) {
              switch(value) {
                
                case 1:
                  // gemColor = 'green';
                  gemColor = '#33CD5F';
                  break;
                
                case 2:
                  // gemColor = 'green'; //#33CD5F
                  gemColor = '#33CD5F';
                  break;
                
                case 3:
                  // gemColor = 'blue'; //#81c9de
                  gemColor = '#81c9de'; 
                  break;

                case 4:
                  // gemColor = 'blue';
                  gemColor = '#81c9de'; 
                  break;

                case 5:
                  // gemColor = 'blue';
                  gemColor = '#81c9de'; 
                  break;

                case 6:
                  // gemColor = 'purple'; //#C555F6
                  gemColor = '#C555F6'; 
                  break;

                case 7:
                  // gemColor = 'purple';
                  gemColor = '#C555F6'; 
                  break;


                default:
                  console.log("Starting off");
                  break;
              }
              // console.log(gemColor);
              // var pointer = document.getElementsByClassName("rz-pointer.rz-pointer-min.rz:active");
              // console.log(pointer);
              // console.log(questionSelectedIndex, DefinitionArray[questionSelectedIndex]);
              
              changeGemColor(gemColor);
              changeGemLabel(value);
              changeGemDefinition(value);
              AnswerListener.setInputValue(value);
              // AnswerListener.getInputValue();
              console.log("haha", value, AnswerListener.getInputValue());
              // console.log(AnswerListener.getInputValue());
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
          
      };

      this.initialize();
    

    };

  

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
    // console.log(array);
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

  

  toggleHighValue = function() {
    if (slider_all_options.maxValue != null) {
      slider_all_options.maxValue = undefined;
    } else {
      slider_all_options.maxValue = 8;
    }
  }

  return QuestionForm;

}]);

app.service('JSONData', function() {
    var questionJSONData = new Array(0);
    // $scope.loadJSON();
    var indexChosen = -1;
    var getJSONDataFromFile = function(filename) {
        var returnJSON = [];
        $.getJSON(filename, function(json) {
          $.each(json.Questions, function(k, v) {
            // console.log(k, v);
          })
          questionJSONData.push(json.Questions);
        });
    // console.log(questionJSONData);
    returnQuestionJSONData();
    }

    var returnQuestionJSONData = function() {
      return questionJSONData;
    }

    var setIndex = function(field) {
      indexChosen = field;
    }

    var getIndex = function(field) {
      return indexChosen;
    }

    return {
      getJSONDataFromFile: getJSONDataFromFile,
      returnQuestionJSONData: returnQuestionJSONData,
      getIndex: getIndex,
      setIndex: setIndex,
    };

});

app.service('AnswerListener', function() {
  var inputValue = -1;
  var questionAnswered = false;
  // console.log("initializing AnswerListener");
  var setInputValue = function(value) {
    // console.log("setting input from ", inputValue, "to ", value);
    
    inputValue = value;

  }

  var getInputValue = function(){
    // console.log("returning", inputValue);
    return inputValue;
  }

  var clearAnswerListener = function() {
    console.log("Clearning answer");
    inputValue = -1;
  }

  var setQuestionAnswered = function(setting) {
      questionAnswered = setting;
  }

  var getQuestionAnswered = function() {
    return questionAnswered;
  }

  return {
    setInputValue: setInputValue,
    getInputValue: getInputValue,
    clearAnswerListener: clearAnswerListener,
    setQuestionAnswered: setQuestionAnswered,
    getQuestionAnswered: getQuestionAnswered,
  };

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
