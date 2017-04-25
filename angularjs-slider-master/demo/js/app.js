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
  
  .state('report', {
    url: '/report',
    templateUrl: 'report.html',
    controller: 'ReportCreator'
  })

  .state('ParticipantResultsPage', {
    url: '/ParticipantResultsPage',
    templateUrl: 'ParticipantResultsPage.html',
    controller: 'ParticipantResultsCreator'
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
      // console.log(JSONData.getJSONDataFromFile('json/questions.json'));
    }


  // $scope.callToGetJSONDATA();
  $scope.gem = null;
  //upon the controller being opened, execute this function
  
  $scope.$on('$ionicView.afterEnter', function(){
    // $scope.drawBigHex();
    
    $scope.appendToMenu();
    $scope.GetColours("blar");
    // console.log("gah", AnswerListener.getInputValue(), AnswerListener.getQuestionAnswered());
    if(AnswerListener.getInputValue() != -1 && AnswerListener.getQuestionAnswered() ==true) {
      // AnswerListener.clearAnswerListener();  
      
      var text_elem_Name = "Q" + JSONData.getIndex() + "gemLabel";
      // var poly_elem_Name = "environments-image" + JSONData.getIndex();
      var poly_elem_Name = "spinObj" + JSONData.getIndex();
      // console.log(elem_Name, typeof elem_Name);
      $scope.changeCompletedGem(JSONData.getIndex(), 
                                  AnswerListener.getInputValue(), 
                                  document.getElementById(poly_elem_Name),
                                  document.getElementById(text_elem_Name));
      AnswerListener.setQuestionAnswered(false);
      $scope.checkCompletionStatus();
      // $scope.showStorage();
    } 
    // console.log(typeof sessionStorage.getItem("Q1"));
  });

  $scope.showStorage = function() {
    Object.keys(sessionStorage).forEach(function(elem, index) {
      console.log(index + " " + elem + " " +  sessionStorage.getItem(elem));
    });
  }

  $scope.checkCompletionStatus = function() {
    var answers = new Array(0);
    Object.keys(sessionStorage).forEach(function(elem, index) {
      // console.log(elem.indexOf("Question: "));
      if(elem.indexOf("Question: ") != -1) {
          console.log(elem);
          answers.push(sessionStorage.getItem(elem));
      }
        
    });
    if(JSONData.returnQuestionLength() == answers.length) {
      console.log("finished!");
      location.href='#/ParticipantResultsPage';
    }
    console.log(answers, answers.length, JSONData.returnQuestionLength());


  }

  $scope.changeCompletedGem = function(gemIndex, answerIndex, polyElem, textElem) {
    // console.log(gemIndex, answerIndex, polyElem, textElem) ;
    $scope.gem = new Gem();
    textElem.textContent = JSONData.returnQuestionJSONData()[0][gemIndex].ValueOptions.value[answerIndex-1].action;
    // console.log(JSONData.returnQuestionJSONData()[0][gemIndex].ValueOptions.value[answerIndex-1].action);
    $scope.gem.changeGemColor(answerIndex, gemIndex, polyElem);
    $scope.callToGetJSONDATA();
    // $scope.gem.createGem(width*2, height*2, gem.setColorPalette(index)[1], 'match_x', polyElem, false);
  }

  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };

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
    sessionStorage.setItem("currentIndex", index);
    sessionStorage.setItem("questionJSONData", JSON.stringify($scope.valueQuestion));
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
        var x = ((Math.sin(a)*radius));
        var y = ((Math.cos(a)*radius));
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

  $scope.appendToMenu = function() {
    // console.log("pha");
      var inputs = document.querySelectorAll('svg[class^="environments-image"]');
      inputs.forEach(function(g, index) {
        g = document.getElementById("spinObj" + index.toString());
        var container = inputs[index];
        var gem = new Gem(container, g);
        var width = container.width.baseVal.value;
        var height = container.height.baseVal.value;
        container.style.height = "100px";
        container.style.width = "100px";
        gem.createGem(width*4, height*4, gem.setColorPalette(index)[1], 'match_x', g, false);
        
        });
  }

  

  $scope.placeGemOnDiv = function(index) {
    var width = (document.getElementById("shapeContainer").offsetWidth)/2;
    var height = (document.getElementById("shapeContainer").offsetHeight)/2;
    // console.log("Placing gem on div", ($scope.getPolyGon(width, height)[index].x), ($scope.getPolyGon(width , height)[index].y -100));
    // console.log(heading, $scope.getPolyGon(width, height)[index].x, $scope.getPolyGon(width , height)[index].y);

    return {"left": $scope.getPolyGon(width, height)[index].x,           
                "top": $scope.getPolyGon(width , height)[index].y,
                "position": "absolute",
                "display": "block",
                "float": "left",
             //    "margin-left": "50vw",
             // "margin-right": "50vw",
                "border-radius": "50%",
              };
  }

  $scope.return100 = function() {
    return {
            "width": "1000px",
            "height": "1000px",
    };
  }


  $scope.placeGemLabel = function(index) {
    var width = (document.getElementById("shapeContainer").offsetWidth)/2;
    var height = (document.getElementById("shapeContainer").offsetHeight)/2;
    
    var heading = document.getElementById("Q" + index.toString() + "gemLabel");
    var gemBox = document.getElementsByClassName("environments-image" + index.toString())[0];
    // console.log(index.toString(), gemBox.width);
    var left = ($scope.getPolyGon(width, height)[index].x) + (gemBox.width.baseVal.value)/10;
    var top = ($scope.getPolyGon(width, height)[index].y) + (gemBox.height.baseVal.value)/4;
    // console.log(left, top);
    heading.style.left =  left + "px";
    heading.style.top = top + "px";

    return {"position": "absolute",
            "width": "100px",
            "height": "100px",
            "font-size": "22",

             "color": "white",
             "display": "block",
             "text-align": "center",
             "width": ((gemBox.width.baseVal.value.toString()*0.8) + "px"),
           };
  }

  $scope.placeProgress = function() {
    var progress = document.getElementById("questionProgressCounterHeading");
    // console.log(progress);
    // var gemBox = document.getElementsByClassName("environments-image" + index.toString())[0];
    var width = ((document.getElementById("shapeContainer").offsetWidth/3)) + "px";
    var height = ((document.getElementById("shapeContainer").offsetHeight/4)) + "px";
    // console.log(height, width);
    // progress.setAttribute("top", (((document.getElementById("shapeContainer").offsetHeight)/2).toString() + "px"));
    return {
            "position": "absolute",
            "font-size": "22",
            "margin": "auto",
            "color": "white",
            "display": "block",
            "top": height,
            "left": width,
            "width": ((document.getElementById("shapeContainer").offsetWidth/4)) + "px",
            
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
    var hex= document.getElementById("bigPoly");
    //draw
    var width = (document.getElementById("shapeContainer").offsetWidth/2);
    var height = (document.getElementById("shapeContainer").offsetHeight/2);
    $scope.gem = new Gem("shapeContainer", "bigSpinObj");
    $scope.gem.createGem(height, height, 'Greys', 'Greys', document.getElementById("bigSpinObj"), true);
    }

    $scope.hexStyle = function() {
      var width = (document.getElementById("shapeContainer").offsetWidth)/2;
      var height = (document.getElementById("shapeContainer").offsetHeight)/2;
      var float = 15e-1;
      var distance = (Math.abs($scope.getPolyGon(width, height)[3].x - $scope.getPolyGon(width, height)[1].x)*float + "px");
      // console.log(width, distance, float);
      return {

                "z-index": "-1",
                "margin-left": "10vw",
                "margin-right": "10vw",
                "margin-top": "10vh",
                "margin-bottom": "10vh",
                "width": distance,
                "height": distance,
                "border-radius": "100%",
              };
    }

    $scope.GetColours = function(arrayOfGems){
      // console.log(document.querySelectorAll('svg[id^="prettyGem"]'));

    }

  $(document).keypress(function(e){
    console.log("shortcut");
    if(e.keyCode ==97) {
      var sortingArray = new Array();
      sessionStorage.setItem("Question: " + "1", 6);
      sessionStorage.setItem("Question: " + "2", 5);
      sessionStorage.setItem("Question: " + "3", 4);
      sessionStorage.setItem("Question: " + "4", 3);
      sessionStorage.setItem("Question: " + "5", 2);
      Object.keys(sessionStorage).forEach(function(elem, index) {
        var newIndex = Math.abs(sessionStorage.getItem(elem)-4);
        console.log(elem, sessionStorage.getItem(elem), newIndex);
        // if(sortingArray.length == 0 ) {
          sortingArray.push({question: elem, rating: sessionStorage.getItem(elem), order: newIndex});
          
        // }
      });
      console.log(sortingArray);
      items = Object.keys(sortingArray).map(function(key) {
        console.log(key, sortingArray[key].rating);
        return [key, sortingArray[key]];
      });
      items.sort(function(first, second) {
        console.log(second[1], first[1], second[1].order - first[1].order);
        return second[1].order - first[1].order;
      });
      
      console.log(items);

      // console.log(sessionStorage.getItem("Question"));
    }
  });   
  
  $scope.form = null;
  $scope.valueQuestion = new Array(0);
  JSONData.getJSONDataFromFile('json/questions.json', "questions");
  $scope.valueQuestion = JSONData.returnQuestionJSONData(); 
  // console.log($scope.valueQuestion[0]);
  
  // console.log(JSONData.returnQuestionJSONData()[0]); 
  // console.log(JSON.parse(sessionStorage.getItem("questionJSONData", $scope.valueQuestion)));



}]);

app.controller('QuestionFormCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 
                                        'Slider', 'JSONData', 'NotifyingService', 'Gem',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, Slider, 
                                        JSONData, NotifyingService, Gem) {
    // $scope.form = null;
    // var gem = null;

      $scope.init = function() {
        // console.log(JSONData.getIndex());
        var index = sessionStorage.getItem("currentIndex", index);
        if(JSONData.getIndex() == -1) {
          console.log("asdasda", JSON.parse(sessionStorage.getItem("questionJSONData"))[0]);
          JSONData.setIndex(sessionStorage.getItem("currentIndex"));

          var array =  JSON.parse(sessionStorage.getItem("questionJSONData"))[0][index];
        } else {
           var array = JSONData.returnQuestionJSONData()[0][index];
        }
        // console.log("current question:", sessionStorage.getItem("currentIndex"), JSONData.getIndex());
       
        // console.log(array);
        document.getElementById("questionHeadingOnForm").innerText = array.Question;
        var qNum = JSONData.getIndex();
        var slider = new Slider(array);
        $scope.gem = new Gem("QshapeContainer", "spinObj");
        var elem = document.getElementById("QshapeContainer");;
        $scope.gem.createGem(elem.clientWidth*2, elem.clientHeight*2, 'Greys', 'Greys', 
                              document.getElementById("spinObj"), true);
        $scope.slider_ticks_legend = slider.sliderGet();
        AnswerListener.setInputValue(4);
      } 
    $scope.init();
    
    // window.onbeforeunload = function() {
    //   sessionStorage.setItem
    // }
    
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




app.controller('ParticipantResultsCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 
                                        'Slider', 'JSONData', 'NotifyingService', 'Gem',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, Slider, 
                                        JSONData, NotifyingService, Gem) {
    // $scope.form = null;
    // var gem = null;

      $scope.init = function() {
        var trace1 = {
          x: [0, -3, -5, -4],
          y: [0, 1, 2, 3],
          // fill: 'tozeroy',
          type: 'scatter'
        };
        var trace2 = {
          x: [0, 3, 5, 4],
          y: [0, 1, 2, 3],
          fill: 'tonexty',
          type: 'scatter'
        };
        var data = [trace1, trace2];
        var layout = {
          width: 700,
          height: 500,
          showlegend: false,
          annotations: [
          {
            x: -3,
            y: 1,
            xref: 'x',
            yref: 'y',
            text: 'Honesty',
            showarrow: true,
            arrowhead: 7,
            ax: 0,
            ay: -40

          }
          ]
        };
        
        Plotly.newPlot('myDiv', data, layout);
        
        // $scope.valueSummary = JSONData.returnReportJSONData();
        // console.log($scope.valueSummary);
      }

      $scope.init();

}]);

app.controller('ReportCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 
                                        'Slider', 'JSONData', 'NotifyingService', 'Gem',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, Slider, 
                                        JSONData, NotifyingService, Gem) {
    // $scope.form = null;
    // var gem = null;

      $scope.init = function() {
        JSONData.getJSONDataFromFile('json/reportExample.json', "report");         
        $scope.valueSummary = JSONData.returnReportJSONData();
        console.log($scope.valueSummary);
      }

      // $scope.init();

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

  this.setColorPalette = function(index) {
    var palette = [['Greens','YlGnBu','Purples'],

                     ['Blues','BuGn', 'YlOrRd'],

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

  this.createGem = function(gheight, gwidth, x_color, y_color, bg, solo) {
    // console.log(gheight, gwidth, x_color, y_color, bg, solo);
    var pattern = Trianglify({
        height: gheight,
        width: gwidth,
        x_colors: x_color,
        y_colors: y_color,
        variance: 0.75,
        cell_size: 60 });  // Put the cell size any higher and the browser will slow down
        var gem = pattern.svg();
        if(solo) {
          gem.setAttribute("id", "prettyGem");
          $('#prettyGem').remove();  
        } else {
          var gemName = "prettyGem" + (bg.id).slice(-1);
          gem.setAttribute("id", gemName);
          $('#' + gemName).remove();  
          // console.log((bg.id).slice(-1), gemName);
        }
        bg.appendChild(gem);
        // console.log(bg);

  }

  this.changeGemColor = function(gemColor, currentIndex, bg) {

    // console.log($("#QshapeContainer").width(), $("#QshapeContainer").height());
    var h = $("#QshapeContainer").height() + 100, w = $("#QshapeContainer").width() + 100;

    var dimensions = determineGemRadius(h, w);

    // h*=0.7;
    // w*=0.7; 
    var colors = {color1: '', color2: '', color3:''};
    colors.color1 = this.setColorPalette(currentIndex)[0];
    colors.color2 = this.setColorPalette(currentIndex)[1];
    colors.color3 = this.setColorPalette(currentIndex)[2];

    var x = setGemColorRange(gemColor, colors.color1,colors.color2,colors.color3)[0];
    var y = setGemColorRange(gemColor, colors.color1,colors.color2,colors.color3)[1];
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
      console.log("Storing answer of " + JSONData.getIndex() + " " + AnswerListener.getInputValue());
      // console.log("triggered", AnswerListener.getInputValue(), typeof AnswerListener.getInputValue());
      storeAnswer(JSONData.getIndex(), AnswerListener.getInputValue());
      AnswerListener.setQuestionAnswered(true);
      location.href='#/menu';
    }

    storeAnswer = function(index, answer) {
      console.log(answer);
      console.log(JSONData.getIndex());
      sessionStorage.setItem("Question: " + index.toString(), answer); /*Store answer*/
      console.log(sessionStorage.getItem(index.toString()));
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
    var reportJSONData = new Array(0);
    var numberOfQuestions = 0;
    // $scope.loadJSON();
    var indexChosen = -1;
    var getJSONDataFromFile = function(filename, dataType) {
        var returnJSON = [];
        $.getJSON(filename, function(json) {
          if(dataType == "questions") {
            $.each(json.Questions, function(k, v) {
              // console.log(k, v);
              numberOfQuestions++;
            })
            questionJSONData.push(json.Questions);
          } else if(dataType == "report") {
            console.log("report");
            $.each(json.Results, function(k, v) {
              // console.log(k, v);
            })
            reportJSONData.push(json.Results);
            
          }
        });
      // console.log(questionJSONData, (typeof(questionJSONData) == "undefined"));
      if((typeof(questionJSONData) == "undefined") == true) {
        // console.log("qd is null");
      }
      // returnQuestionJSONData();
    }

    var returnQuestionLength = function() {
      return numberOfQuestions/2;
    }

    var returnQuestionJSONData = function() {
      return questionJSONData;
    }

    var returnReportJSONData = function() {
      return reportJSONData;
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
      returnReportJSONData: returnReportJSONData,
      returnQuestionLength: returnQuestionLength,
      getIndex: getIndex,
      setIndex: setIndex,
    };

});

app.service('AnswerListener', function() {
  var inputValue = -1;
  var questionAnswered = false;
  var answeredQuestions = 0;

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
      answeredQuestions++;
      console.log(answeredQuestions);
  }

  var getQuestionsAnsweredCount = function() {
    return answeredQuestions;
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
