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
	['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 'JSONData', 'Gem', 'PHPData', 'ColorBrewerList',
		function($rootScope, $scope, $timeout, $uibModal, AnswerListener, JSONData, Gem, PHPData, ColorBrewerList) {

    
    $scope.callToGetJSONDATA = function() {
      // console.log(JSONData.getJSONDataFromFile('json/questions.json'));
    }
   
  // $scope.callToGetJSONDATA();
  $scope.gem = null;
  //upon the controller being opened, execute this function
  
  $scope.$on('$ionicView.afterEnter', function(){
    // $scope.drawBigHex();
    // console.log("afterEnter called");

    $scope.appendToMenu();
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
    document.getElementsByClassName("environments-image" + gemIndex.toString())[0].style.opacity = "0.5";s
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


  $scope.getPolyGon = function (drawingAreaWidth, drawingAreaHeight, corners) {
    // var c= document.getElementsByClassName("hexCanvas")[0];
    // console.log(c);
    // var hex = $("#hexCanvas");
    // var c = hex.getContext("2d");
    var width = drawingAreaWidth;
    // var width = 800;
    var height = drawingAreaHeight;
    // var height = 400;
    // corners = 8;
    // console.log(corners);
    // var corners = 5;
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
      // console.log(inputs);
      inputs.forEach(function(g, index) {
        // console.log(index);
        g = document.getElementById("spinObj" + index.toString());
        var container = inputs[index];
        var gem = new Gem(container, g);
        var width = container.width.baseVal.value;
        var height = container.height.baseVal.value;
        container.style.height = "100px";
        container.style.width = "100px";
        // console.log($(window).width());
        // container.style.height = $(window).height()/6.10769;
        // container.style.width =  $(window).width()/7.330769230769231;
        // console.log("UGH", gem.setColorPalette(index)[1]);
        gem.createGem(width*4, height*4, ColorBrewerList.setColorPalette(index)[1], 'match_x', g, false);
        // gem.createGem(width*4, height*4, gem.setColorPalette(index)[1], 'match_x', g, false);
        
        });
  }


  $scope.placeGemOnDiv = function(index) {
    // console.log(document.getElementById("shapeContainer").offsetWidth, document.getElementById("shapeContainer").offsetHeight);
    var width = (document.getElementById("shapeContainer").offsetWidth)/1.45;
    var height = (document.getElementById("shapeContainer").offsetHeight)/1.45;
    // console.log(index, JSONData.returnQuestionLength());
    // console.log($scope.getPolyGon(width, height, JSONData.returnQuestionLength()));
    return {"left": $scope.getPolyGon(width, height, JSONData.returnQuestionLength())[index].x,           
                "top": $scope.getPolyGon(width , height, JSONData.returnQuestionLength())[index].y,
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
    // console.log(ColorBrewerList.getContrast50(index));
    var width = (document.getElementById("shapeContainer").offsetWidth)/1.45;
    var height = (document.getElementById("shapeContainer").offsetHeight)/1.45;
    var heading = document.getElementById("Q" + index.toString() + "gemLabel");
    var gemBox = document.getElementsByClassName("environments-image" + index.toString())[0];
    // console.log(index.toString(), gemBox.width);
    var left = ($scope.getPolyGon(width, height, JSONData.returnQuestionLength())[index].x) + (gemBox.width.baseVal.value)/10;
    var top = ($scope.getPolyGon(width, height, JSONData.returnQuestionLength())[index].y) + (gemBox.height.baseVal.value)/4;
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



  $(document).keypress(function(e){
    // console.log("shortcut");
    if(e.keyCode ==97) {
      
      sessionStorage.setItem("Question: " + "0", 6);
      sessionStorage.setItem("Question: " + "1", 5);
      sessionStorage.setItem("Question: " + "2", 4);
      sessionStorage.setItem("Question: " + "3", 3);
      sessionStorage.setItem("Question: " + "4", 1);
      sessionStorage.setItem("Question: " + "5", 0);
      sessionStorage.setItem("Question: " + "6", 5);
      sessionStorage.setItem("Question: " + "7", 4);
      
      // console.log(sessionStorage.getItem("Question: 0"));

      // console.log(JSON.parse(sessionStorage.getItem("questionJSONData")));
      // printAllSessionsData();

      location.href='#/ParticipantResultsPage';
    }
  });

  printAllSessionsData = function() {
    console.log("All sessionStorage data:");
    for (var i = 0; i < sessionStorage.length; i++){
        console.log(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
  }
  
      $scope.form = null;
      $scope.valueQuestion = new Array(0);
      $scope.jsonData = {};
      // $scope.valueQuesiton = PHPData.getOutput();
      // console.log(PHPData.returnPHPData());
      // JSONData.getJSONDataFromFile('json/newQuestions10.json', "questions");
      // JSONData.getJSONDataFromFile('json/questions2.json', "questions");
      
      JSONData.returnQuestionJSONData('json/questions2.json', "questions", function(data) { 
        sessionStorage.setItem("questionJSONData", JSON.stringify(data)); 
        $scope.valueQuestion = data;
        // console.log($scope.valueQuestion, data);
        // console.log(JSON.parse(sessionStorage.getItem("questionJSONData")));
      });


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
           var array = JSONData.returnQuestionJSONData('json/questions2.json', "questions")[0][index];
        }
       
       
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


    var x = new Array();
    var y = new Array();
    var left = new Array();
    var right = new Array();
    var x2 = new Array();
    var labels = new Array();
    var xAxis = new Array();
    var yAxis = new Array();
    var ideal = new Array();
      
      $scope.init = function(answerDeviations, negDeviations, questionNumberAsArray) {
        $scope.generatePlot();
        var trace1 = {
          x: x,
          y: questionNumberAsArray,
          // fill: 'tozeroy',
          type: 'scatter',
          // name: 'Your Projection',
          showlegend: false
        };
        var trace2 = {
          x: x,
          y: questionNumberAsArray,
          fill: 'tonexty',
          type: 'scatter',
          name: 'Ideal Projection'
        };

        var trace3 = { //Right filling
          x: right,
          y: questionNumberAsArray,
          showlegend: false,
          // fill: 'tonexty',
          // name: 'Ideal Projection',
          type: 'scatter'
        };

        var trace4 = { //Left Filling
          x: left,
          y: questionNumberAsArray,
          fill: 'tonexty',
          name: 'Your Projection',
          type: 'scatter',
          
        };

        var data = [trace1, trace2, trace3, trace4];
        var layout = {
          title: 'Your Values vs The Ideal Value Set',
          titlefont:{ family: 'title', size: 18, color: '#FFFFFF'},
          margin: {
            l:200,
            r:100,
            b:100,
            t:100,
            pad:40          
          },
          width: 900,
          paper_bgcolor: 'rgba(0,0,0, 0.7)',
          plot_bgcolor: '#FFFFFF',
          gridcolor: '#FFFFFF',
          height: 500,
          showlegend: true, 
          legend: {
            y: 0.3,
            x: 1.2,
            // "orientation": "h",
            "bgcolor": "#FFFFFF"
          },
          xaxis: {title: 'Deviation from Balanced Value', 
                    titlefont:{ family: 'title', size: 18, color: '#FFFFFF'}, 
                    // tickcolor: '#000000',
                    tickfont: {family: 'title', size: 12, color: '#FFFFFF'},
                    tickvals: [-3, -2, -1, 0, 1, 2, 3], 
                    ticktext: [-3, -2, -1, 0, 1, 2, 3],
                    // gridcolor: '#000000'
                    // color: '#FFFFFF',
                    },

          yaxis: {title: 'Core Value', 
                    titlefont:{ family: 'title', size: 18, color: '#FFFFFF'}, 
                    tickvals:['0', '1', '2', '3', '4', '5', '6', '7'],
                    // tickcolor: '#FFFFFF',
                    tickfont: {family: 'title', size: 12, color: '#FFFFFF'},
                    ticktext: yAxis},
                    // gridcolor: '#000000',
                    color: '#FFFFFF',
          annotations: labels
        };
        
        Plotly.newPlot('myDiv', data, layout);
        
        // $scope.valueSummary = JSONData.returnReportJSONData();
        // console.log($scope.valueSummary);
      }

      $scope.generateIdealProjection = function(arr) {
        var fib = [];
        fib[0] = 0;
        fib[1] = 1;
        for(i=2; i<=10; i++) {
          fib[i] = fib[i-3] + fib[i-1];
        }
        console.log(fib);
        return fib;
      }

      $scope.orderResults = function() {
        sortingArray = new Array();
        // console.log(sessionStorage.getItem("questionJSONData"));
        console.log(JSON.parse(sessionStorage.getItem("questionJSONData"))[0]);
        Object.keys(sessionStorage).forEach(function(elem, index) {
          if(elem.indexOf("Question: ") != -1) {
            var newIndex = (sessionStorage.getItem(elem) - 3);
            var questionIndex = elem.replace('Question: ', '');
            console.log(sessionStorage.getItem(elem), newIndex); 
            // console.log(sessionStorage.getItem(elem)); 
            // console.log(JSON.parse(sessionStorage.getItem("QuestionData"))[0][0].BasicLabel); 
            // console.log(JSON.parse(sessionStorage.getItem("questionJSONData"))); 
            // console.log(elem.replace('Question: ', '')) 
            // console.log(elem, sessionStorage.getItem(elem), JSON.parse(sessionStorage.getItem("questionJSONData"))[0][questionIndex]);
            // console.log(elem, sessionStorage.getItem(elem));
            // console.log("discourse:", (JSON.parse(sessionStorage.getItem("questionJSONData")))[0][questionIndex].BasicLabel);
            sortingArray.push({question: elem.replace('Question: ', ''), 
                discourse: (JSON.parse(sessionStorage.getItem("questionJSONData")))[0][questionIndex].BasicLabel, 
                rating: JSON.parse(sessionStorage.getItem("questionJSONData"))[0][questionIndex].ValueOptions.value[sessionStorage.getItem(elem)].action, 
                distanceFrom4: newIndex,
                absDistanceFrom4: Math.abs(newIndex)});
          }
          
        // }
        });
        console.log(sortingArray);
        items = Object.keys(sortingArray).map(function(key) {
          // console.log(key, sortingArray[key].rating);
          return [key, sortingArray[key]];
        });
        items.sort(function(first, second) {
          // console.log(first[1], second[1]);
          return first[1].absDistanceFrom4 - second[1].absDistanceFrom4;
        });
        
        // console.log(items);
        return items;
      }

      $scope.generatePlot = function() {
        temp = $scope.orderResults();
        var t = new Array();
        console.log(temp);
        for(i=0; i < temp.length; i++) {
          x[i] = temp[i][1].distanceFrom4;
          x2[i] = x[i]*-1;
          y[i] = i;
          console.log(i, x[i]);

          yAxis[i] = temp[i][1].discourse;
          if(i == 0) {
            left[i] = x[i];
            right[i] = x[i];
            labels.push({
            x: x[i],
            y: i,
            xref: 'x',
            yref: 'y',
            text: temp[i][1].rating,
            showarrow: true,
            arrowhead: 7,
            ax: 100,
            ay: -30
          });

          } else if(x[i] < 0) {
            left[i] = x[i];
            right[i] = x2[i];
            labels.push({
            x: x[i],
            y: i,
            xref: 'x',
            yref: 'y',
            text: temp[i][1].rating,
            showarrow: true,
            arrowhead: 7,
            ax: -80,
            ay: 0
          }); 
          } else {
            left[i] = x2[i];
            right[i] = x[i];
            labels.push({
            x: x[i],
            y: i,
            xref: 'x',
            yref: 'y',
            text: temp[i][1].rating,
            showarrow: true,
            arrowhead: 7,
            ax: 80,
            ay: 0
          });
          }
          
        }
        
        console.log(x, xAxis, xAxis[0]);
        // (Question number (y), Value slider (x), value chosen (text))
      }
      $scope.generateIdealProjection(ideal);
      $scope.init(x, x2, y);




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

app.factory('Gem', ['$rootScope', '$http', 'JSONData', 'ColorBrewerList', function($rootScope, $http, JSONData, ColorBrewerList) {
  var Gem = function(container, appendingObj) {
      this.initialize = function() {
        // console.log("Gem", JSONData.getIndex());
        var elem = document.getElementById(container);
        // console.log(elem);
        // console.log(elem.clientHeight);
        // document.getElementById(appendingObj), false);
		// console.log(this.gem);

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
    colors.color1 = ColorBrewerList.setColorPalette(currentIndex)[0];
    colors.color2 = ColorBrewerList.setColorPalette(currentIndex)[1];
    colors.color3 = ColorBrewerList.setColorPalette(currentIndex)[2];

    var x = setGemColorRange(gemColor, colors.color1,colors.color2,colors.color3)[0];
    var y = setGemColorRange(gemColor, colors.color1,colors.color2,colors.color3)[1];
    // var bg = document.getElementById("spinObj");
    // console.log(gemColor, currentIndex%7, x,y);
    // set up the base pattern
    this.createGem(dimensions[0], dimensions[1], x, y, bg, true);
  }

  this.changeGemDefinition = function(value) {
     document.getElementsByClassName("valueExplanation")[0].innerHTML = JSONData.returnQuestionJSONData('json/questions2.json', "questions")[0][JSONData.getIndex()].ValueOptions.value[value-1].definition;
  }
  this.changeGemLabel = function(value) {
    var gemTxt = document.getElementById("gemLabel");

    var description = JSONData.returnQuestionJSONData('json/questions2.json', "questions")[0][JSONData.getIndex()].ValueOptions.value[value-1].action;
    document.getElementById("gemLabel").textContent = description;
    if(description.length > 14) {
      var split = description.match(/.{1,14}/g);
    }

  }

  this.initialize();

 };
 return Gem;

}]);


app.factory('Slider', ['$rootScope', '$http', 'AnswerListener', 'JSONData', 'NotifyingService','ColorBrewerList', 
              function($rootScope, $http, AnswerListener, JSONData, NotifyingService, ColorBrewerList) {
    
    var Slider = function(questionJSONData) {
      this.initialize = function() {
        this.slider_ticks_legend = {};
        this.indexChosen = JSONData.getIndex();
        this.valueSelected = 4;
        // var colourRange = require("./././trianglify-master/lib/colorbrewer.js");
        // require(['./././trianglify-master/lib/colorbrewer.js'], function(foo) {
        //   var colourRange = require('./././trianglify-master/lib/colorbrewer.js');
        // });
        // console.log(module.exports);
        // var dom = document.getElementsByClassName('rz-bar'); 
        // console.log(dom);
        // console.log(ColorBrewerList.searchForColor("Reds"));
        // dom.style.backgroundImage = 'linear-gradient(#000000, #ffffff)';
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
      console.log(JSONData.getIndex());
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
      // console.log(JSONData.getIndex()); 
      // console.log(JSONData.returnQuestionJSONData('json/questions2.json', "questions")[0][JSONData.getIndex()].ValueOptions);
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

            showTicksValues: true,

            // ticksValuesTooltip: function(value) {
            //   console.log("tooltip triggered");
            //   return 'Tooltip for ';
            // },

            ticksTooltip: function(v) {
              // console.log("tooltip triggered");
              return (JSONData.returnQuestionJSONData('json/questions2.json', "questions")[0][JSONData.getIndex()].ValueOptions.value[v].definition);
            },

            getTickColor: function (value) {
              var colorRange = ColorBrewerList.setColorPalette(JSONData.getIndex());
              console.log(colorRange[0], ColorBrewerList.searchForColor(colorRange[0]));
              if (value < 3) 
                return (ColorBrewerList.searchForColor(colorRange[0]));
              if (value < 6)
                return ColorBrewerList.searchForColor(colorRange[1]);
              if (value < 9)
                return ColorBrewerList.searchForColor(colorRange[2]);
              return '#2AE02A';
          },

            getPointerColor: function(v) {              
              AnswerListener.setInputValue(v);
              notify();
              return v;
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
    

    var getJSONDataFromFile = function(filename, dataType, callback) {
        var returnJSON = [];
        $.getJSON(filename, function(json) {
              if(dataType == "questions") {
                $.each(json.Questions, function(k, v) {
                  // console.log(k, v, questionJSONData);
                  // console.log(numberOfQuestions);
                  numberOfQuestions++;
                })
                questionJSONData.push(json.Questions);
                callback(questionJSONData);
                // console.log(questionJSONData);

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
      // console.log(numberOfQuestions);
    }

    var returnQuestionLength = function() {
      return numberOfQuestions;
    }

    var setQuestionJSONData = function(val) {
        questionJSONData = val;
    }

    var returnQuestionJSONData = function(filename, dataType, callback) {
      // console.log(questionJSONData);
      if(questionJSONData.length == 0) {
          getJSONDataFromFile(filename, dataType, callback);
      }
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
      setQuestionJSONData: setQuestionJSONData,
      returnQuestionJSONData: returnQuestionJSONData,
      returnReportJSONData: returnReportJSONData,
      returnQuestionLength: returnQuestionLength,
      getIndex: getIndex,
      setIndex: setIndex,
    };
});

app.service('PHPData', function() {
    // handles the click event, sends the query
  var data = new Array(0);
  var getOutput = function() {
    console.log("Doin it");

    //  $.getJSON('php/fetchFromServer.php', function(response) {    
    //     $.each(response, function(fieldName, fieldValue) {
    //       // data.push(response.responseText);
    //       console.log(response, fieldName, fieldValue, response.responseText);
    //       // $("#" + fieldName).val(fieldValue);          
    //         });
    //     data.push(response);
    // });
    // return false;

    $.ajax({
      url: "php/fetchFromServer.php",
      dataType: "json",
      async: false,
      success: function(jsonStuff, textStatus, jqXHR) {
        console.log("success");
        data.push(jsonStuff)
        console.log(textStatus);
      }
    });
  }

  var returnPHPData = function() {
    return data;
  }

  return {
    getOutput: getOutput,
    returnPHPData: returnPHPData,
  };
});

app.service('ColorBrewerList', function() {
  var colorList = {"color": [
    {"color": "YlGn", "array": ["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"]},
    {"color": "YlGnBu", "array": ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]},
    {"color": "GnBu", "array": ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]},
   {"color":  "BuGn", "array": ["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"]},
    {"color": "PuBuGn", "array": ["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"]},
    {"color": "PuBu", "array": ["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"]},
    {"color": "BuPu", "array": ["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"]},
    {"color": "RdPu", "array": ["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"]},
    {"color": "PuRd", "array": ["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"]},
    {"color": "OrRd", "array": ["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"]},
    {"color": "YlOrRd", "array": ["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"]},
    {"color": "YlOrBr", "array": ["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"]},
    {"color": "Purples", "array": ["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"]},
   {"color":  "Blues", "array": ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]},
   {"color":  "Greens", "array": ["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"]},
   {"color":  "Oranges", "array": ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"]},
    {"color": "Reds", "array": ["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"]},
   {"color":  "Greys", "array": ["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"]},
   {"color":  "PuOr", "array": ["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"]},
   {"color":  "BrBG", "array": ["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"]},
   {"color":  "PRGn", "array": ["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"]},
  {"color":   "PiYG", "array": ["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"]},
   {"color":  "RdBu", "array": ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"]},
   {"color":  "RdGy", "array": ["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"]},
   {"color":  "RdYlBu", "array": ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"]},
   {"color":  "Spectral", "array": ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"]},
   {"color":  "RdYlGn", "array": ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]}
  ]};

  var returnColorList = function() {
    return colorList;
  }

  var setColorPalette = function(index) {
    
    // console.log(palette[index]);
    var palette = [
                     ['YlGnBu','Greens','Purples'],
                     ['RdGy','YlOrBr','GnBu'],
                     ['RdYlBu','Greens','Purples'],
                     ['BuGn','Blues', 'YlOrRd'],
                     ['Greens', 'Oranges', 'PuBuGn'],
                     ['PuRd', 'RdPu', 'OrRd'],
                     ['Reds', 'Blues', 'Oranges'],
                     ['PuOr', 'Reds', 'BrBG'],
                     ['PRGn', 'Greens', 'RdBu'],
                     ['PRGn', 'Blues', 'RdBu'],
                     ['PRGn', 'Purples', 'RdBu'],
                     ['PRGn', 'Spectral', 'RdBu'],
                     ['PiYG', 'PRGn', 'RdBu'],
                     ['YIOrRd', 'OrRd', 'PuRd'],
                     ['PuOr', 'BrBG', 'Blues'],
                     ['Set3', 'RdYlGn', 'Set1'],
                     ['Pastel2', 'Greys', 'Pastel1']];
      // console.log("colors chosen ", palette[index]);
      // console.log(palette[index], index);
    return palette[index];
  }

  var searchForColor = function(color) {
    // console.log(colorList.color[0]);
    var returnColor = '';
    Object.keys(colorList.color).forEach(function(elem, index) {
        
        var colorName = colorList.color[index].color;
        // console.log(colorName, index, color, colorName == color);
        if(colorName == color) {
          // console.log(colorName, typeof(elem), color);
          // console.log(colorList.color[index].array[0]);
          var array = colorList.color[index].array;
          // console.log(array);
          returnColor = (colorList.color[index].array[3]);
        }
        // console.log(index + " " + elem + " " + (elem.toString() === color) + " " + elem.toString());
      });
    return returnColor;
  }

  var getContrast50 = function(index) {
    var hexcolor = searchForColor((setColorPalette(index))[1]);
    console.log(searchForColor((setColorPalette(index))[1]));
    return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'black':'white';
}



  return {
    returnColorList: returnColorList,
    searchForColor: searchForColor,
    setColorPalette: setColorPalette,
    getContrast50: getContrast50,
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
