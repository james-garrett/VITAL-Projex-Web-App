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
	['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 'JSONData', 'Gem',
		function($rootScope, $scope, $timeout, $uibModal, AnswerListener, JSONData, Gem) {
    $scope.valueQuestion = new Array(0);
    $scope.jsonData = {};
    
    $scope.callToGetJSONDATA = function() {
      console.log(JSONData.getJSONDataFromFile('json/questions.json'));
    }


  // $scope.callToGetJSONDATA();
  $scope.gem = null;
  //upon the controller being opened, execute this function
  $scope.$on('$ionicView.afterEnter', function(){
    // $scope.drawBigHex();

    console.log("gah");
    if(AnswerListener.getInputValue() != -1 && AnswerListener.getQuestionAnswered() !=true) {
      // AnswerListener.clearAnswerListener();  
      
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
    // textElem.innerText = "fuck";
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

  $scope.appendToMenu = function(index) {
    // console.log("gi");
    
      var container = document.getElementsByClassName("environments-image" + index.toString())[0];
      var g = document.getElementById("spinObj" + index.toString());
      // console.log(container.width(), container.height(), typeof index, "#environments-image" + index.toString());
      // container.setAttribute("width", "45%");
      // container.setAttribute("height", "45%");
      // console.log(container.width.baseVal.value); 
      // console.log(container, g);
      var gem = new Gem(container, g);
      var width = container.width.baseVal.value;
      var height = container.height.baseVal.value;
      // console.log(container, g );
      console.log(width, height);
      gem.createGem(height, width, 'Greys', 'Greys', 
            g, false);
      return {"left": $scope.getPolyGon(width, height)[index].x,           
              "top": $scope.getPolyGon(width , height)[index].y -100,
              // "position": "absolute",
              // "display": "block"
              // "float": "left"
            };
      
  }

  
  $scope.setHexCanvasStyle = function(hex, shapeContainer) {
    // console.log(shapeContainer.width())
    hex.style.width = shapeContainer.width();
    hex.style.height = shapeContainer.height();
    hex.width = hex.offSetWidth;
    hex.height = hex.offSetHeight;
    return hex;
  }

  $scope.drawBigHex = function() {
    // console.log("shapeContainer dims:", $("#shapeContainer").width(), $("#shapeContainer").height()) ;
    var hex= document.getElementById("hexCanvas");
    var shapeContainer = document.getElementById("hexCanvas");
    // console.log("hexCanvas dims:", $("#hexCanvas").width(), $("#hexCanvas").height());
    // $scope.setHexCanvasStyle(hex, $("#shapeContainer"));
    var c = hex.getContext("2d");
    c.width = shapeContainer.innerWidth;
    c.height = shapeContainer.innerHeight;
    var points = $scope.getPolyGon($("#shapeContainer").width(), $("#shapeContainer").height());
    
    // console.log("start at ", points[0].x, points[0].y);
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
          
    
    //draw path
    
      c.beginPath();
      c.moveTo(points[0].x, points[0].y);
      for(var i = 1; i < points.length; i++) {
        // console.log(i, "Move to", points[i-1].x, points[i-1].y, " Line to", points[i].x, points[i].y)
        
        c.lineTo(points[i].x, points[i].y);
      }
      c.strokeStyle = "#000000";
      c.lineWidth = "0";
      c.stroke();
      c.fill();
      c.closePath();
    //draw
    
  }



}]);

app.controller('QuestionFormCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 
                                        'Slider', 'JSONData', 'NotifyingService', 'Gem',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, Slider, 
                                        JSONData, NotifyingService, Gem) {
    // $scope.form = null;
    // var gem = null;
      $scope.init = function() {
        var array = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()];
        // console.log(array);
        document.getElementById("questionHeadingOnForm").innerText = array.Question;
        var qNum = JSONData.getIndex();
        var slider = new Slider(array);
        $scope.gem = new Gem("QshapeContainer", "spinObj");
        var elem = document.getElementById("QshapeContainer");;
        $scope.gem.createGem(elem.clientWidth*2, elem.clientHeight*2, 'Greys', 'Greys', 
        document.getElementById("spinObj"), false);
        $scope.slider_ticks_legend = slider.sliderGet();
        AnswerListener.setInputValue(4);
      } 
    $scope.init();
    
    
      NotifyingService.subscribe($scope, function somethingChanged() {
        gemEvent();
          console.log("NotifyingService caught call");

      });
      
      gemEvent = function() {
      	$scope.gem.changeGemColor(AnswerListener.getInputValue(), JSONData.getIndex(), document.getElementById("spinObj"));
        $scope.gem.changeGemLabel(AnswerListener.getInputValue());
        $scope.gem.changeGemDefinition(AnswerListener.getInputValue());
      }

      $scope.$on('JSONDATA', function(event, array) {
        // console.log(array);
      });
  }]);


app.factory('Gem', ['$rootScope', '$http', 'JSONData', function($rootScope, $http, JSONData) {
  var Gem = function(container, appendingObj) {
      this.initialize = function() {
        // console.log("Gem", JSONData.getIndex());
        var elem = document.getElementById(container);
        // console.log(elem);
        // console.log(elem.clientHeight);
        // document.getElementById(appendingObj), false);
		// console.log(this.gem);

      }

  setColorPalette = function(index) {
    var palette = [['Greens','YlGnBu','Purples'],

                     ['YIGnBu','BuGn', 'PuGn'],

                     ['PuBuGn', 'PuBu', 'BuPu'],

                     ['RdPu', 'PuRd', 'OrRd'],

                     ['Blues', 'Reds', 'Oranges'],

                     ['Reds', 'PuOr', 'BrBG'],

                     ['PRGn', 'PiYG', 'RdBu'],

                     ['RdGy', 'RdYIBu', 'Spectral'],

                     ['Accent', 'Dark2', 'Paired']];
      // console.log("colors chosen ", palette[index]);
      return palette[index];
    }

  setGemColorRange = function(gemColor, color1, color2, color3) {
    // console.log(gemColor);
    switch(gemColor) {
      
      case 0:
      case 1:
        return [color1, 'match_x'];
        
      case 2:
      case 3:
        return [color1, color2];

      case 4:
        // return ['Blues', 'match_x'];
        return [color2, 'match_x'];
      
      case 5: 
      case 6:
        return [color2, color3];

      case 7:
        return [color3, 'match_x'];
      default:
        return ['Random', 'match_x'];
    }
  }


  determineGemRadius = function(height, width) {
    switch(height) {
      case height > 800:
          return [height+100, width+100];
      default:
          return [height+200, width+200]
    }
  }

  getCoord = function(inputElem, inputGContainer) {
  
    var elem = $("#" + inputElem);
    var gContainer = $("#" + inputGContainer);
    // console.log("args",)
    createGem(elem.width(), elem.height(), 'Greys', 'Greys', 
    			document.getElementById(inputGContainer), false);
    return {"left": $rootScope.getPolyGon(elem.width(), elem.height())[index].x,           
            "top": $rootScope.getPolyGon(elem.width() , elem.height())[index].y -100,
            "position": "absolute",
            // "display": "block"
            // "float": "left"
          };
  }

  this.createGem = function(height, width, x_color, y_color, bg, solo) {
    var pattern = Trianglify({
        height: height,
        width: width,
        x_colors: x_color,
        y_colors: y_color,
        variance: 0.75,
        cell_size: 60 });  // Put the cell size any higher and the browser will slow down
        var gem = pattern.svg();
        // if(solo) {
          // background.getElementById()
        // } else {
          gem.setAttribute("id", "prettyGem");
          $('#prettyGem').remove();  
        // }
        // console.log(bg);
        bg.appendChild(gem);

  }

  this.changeGemColor = function(gemColor, currentIndex, bg) {

    // console.log($("#QshapeContainer").width(), $("#QshapeContainer").height());
    var h = $("#QshapeContainer").height() + 100, w = $("#QshapeContainer").width() + 100;

    var dimensions = determineGemRadius(h, w);

    // h*=0.7;
    // w*=0.7; 
    var colors = {color1: '', color2: '', color3:''};
    colors.color1 = setColorPalette(currentIndex)[0];
    colors.color2 = setColorPalette(currentIndex)[1];
    colors.color3 = setColorPalette(currentIndex)[2];

    var x = setGemColorRange(gemColor%7, colors.color1,colors.color2,colors.color3)[0];
    var y = setGemColorRange(gemColor%7, colors.color1,colors.color2,colors.color3)[1];
    // var bg = document.getElementById("spinObj");
    // console.log(gemColor, currentIndex%7, x,y);
    // set up the base pattern
    this.createGem(dimensions[0], dimensions[1], x, y, bg, true);
  }

  this.changeGemDefinition = function(value) {
     document.getElementsByClassName("valueExplanation")[0].innerHTML = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[value-1].definition;
  }
  this.changeGemLabel = function(value) {
    var gemTxt = document.getElementById("gemLabel");

    var description = JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[value-1].action;
    document.getElementById("gemLabel").textContent = description;
    if(description.length > 14) {
      var split = description.match(/.{1,14}/g);
    }

  }

  this.initialize();

 };
 return Gem;

}]);

app.factory('Slider', ['$rootScope', '$http', 'AnswerListener', 'JSONData', 'NotifyingService', 
              function($rootScope, $http, AnswerListener, JSONData, NotifyingService) {
    
    var Slider = function(questionJSONData) {
      this.initialize = function() {
        this.slider_ticks_legend = {};
        this.indexChosen = JSONData.getIndex();
        this.valueSelected = 4;
    };

    notify = function() {
        NotifyingService.notify();
    }

    this.slider_ticks_legend = {};

    clearDiv = function(div) {
      

      // while(div.firstChild) {
      //   div.removeChild(div.firstChild);
      // }
    }


    backToMenu = function() {
      // console.log("triggered", AnswerListener.getInputValue(), typeof AnswerListener.getInputValue());
      storeAnswer(AnswerListener.getInputValue());
      AnswerListener.setQuestionAnswered(true);
      location.href='#/menu';
    }

    storeAnswer = function(answer) {
      // console.log(answer);
      sessionStorage.setItem("Q1", answer); /*Store answer*/
      // console.log(sessionStorage.getItem("Q1"));
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
              AnswerListener.setInputValue(value);
              notify();
              return value;
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

app.factory('NotifyingService', function($rootScope) {
    return {
        subscribe: function(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        },

        notify: function() {
            $rootScope.$emit('notifying-service-event');
        }
    };
});


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
    // console.log("Clearning answer");
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
