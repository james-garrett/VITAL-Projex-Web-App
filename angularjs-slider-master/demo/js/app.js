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
	['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 'JSONData', 'Gem', 'PHPData',
		function($rootScope, $scope, $timeout, $uibModal, AnswerListener, JSONData, Gem, PHPData) {
      $scope.valueQuestion = new Array(0);
      $scope.jsonData = {};
      $scope.form = null;
      $scope.valueQuestion = new Array(0);
      // PHPData.getOutput();
      // console.log(PHPData.returnPHPData());
      JSONData.getJSONDataFromFile('json/newQuestions10.json', "questions");
      
      $scope.valueQuestion = JSONData.returnQuestionJSONData(); 
      sessionStorage.setItem("QuestionData", JSON.stringify($scope.valueQuestion));
    
    $scope.callToGetJSONDATA = function() {
      // console.log(JSONData.getJSONDataFromFile('json/questions.json'));
    }


  // $scope.callToGetJSONDATA();
  $scope.gem = null;
  //upon the controller being opened, execute this function
  
  $scope.$on('$ionicView.afterEnter', function(){
    // $scope.drawBigHex();
    console.log("afterEnter called");
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
      console.log(inputs);
      inputs.forEach(function(g, index) {
        console.log(index);
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
        gem.createGem(width*4, height*4, gem.setColorPalette(0)[1], 'match_x', g, false);
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
    console.log("shortcut");
    if(e.keyCode ==97) {
      var sortingArray = new Array();
      sessionStorage.setItem("Question: " + "0", 6);
      sessionStorage.setItem("Question: " + "1", 5);
      sessionStorage.setItem("Question: " + "2", 4);
      sessionStorage.setItem("Question: " + "3", 3);
      sessionStorage.setItem("Question: " + "4", 2);
      location.href='#/ParticipantResultsPage';
      // console.log(sessionStorage.getItem("Question"));
    }
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
           var array = JSONData.returnQuestionJSONData()[0][index];
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
    var x2 = new Array();
    var labels = new Array();
    var xAxis = new Array();
    var yAxis = new Array();
      
      $scope.init = function() {
        $scope.generatePlot();
        var trace1 = {
          x: x,
          y: [0, 1, 2, 3, 4],
          // fill: 'tozeroy',
          type: 'scatter',
          // name: 'Your Projection',
          showlegend: false
        };
        var trace2 = {
          x: x2,
          y: [0, 1, 2, 3, 4],
          fill: 'tonexty',
          type: 'scatter',
          name: 'Your Projection'
        };

        var trace3 = {
          x: [0, 1, 1, 1, 2],
          y: [0, 1, 2, 3, 4],
          showlegend: false,
          // fill: 'tonexty',
          // name: 'Ideal Projection',
          type: 'scatter'
        };

        var trace4 = {
          x: [0, -1, -1, -1, -2],
          y: [0, 1, 2, 3, 4],
          fill: 'tonexty',
          name: 'Ideal Projection',
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
          width: 700,
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
                    tickvals:['0', '1', '2', '3', '4'],
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

      $scope.orderResults = function() {
        sortingArray = new Array();
        console.log(JSON.parse(sessionStorage.getItem("QuestionData"))[0]);
        Object.keys(sessionStorage).forEach(function(elem, index) {
          if(elem.indexOf("Question: ") != -1) {
            var newIndex = Math.abs(sessionStorage.getItem(elem)-4);
            var questionIndex = elem.replace('Question: ', '');
            console.log(questionIndex, sessionStorage.getItem(elem), (JSON.parse(sessionStorage.getItem("QuestionData")))[0][0].BasicLabel, elem.replace('Question: ', ''), elem, sessionStorage.getItem(elem), JSON.parse(sessionStorage.getItem("QuestionData"))[0][1]);
            console.log(sessionStorage.getItem(elem));
            sortingArray.push({question: elem.replace('Question: ', ''), 
                discourse: (JSON.parse(sessionStorage.getItem("QuestionData")))[0][questionIndex].BasicLabel, 
                rating: JSON.parse(sessionStorage.getItem("QuestionData"))[0][questionIndex].ValueOptions.value[sessionStorage.getItem(elem)].action, 
                distanceFrom4: newIndex});
          }
          
        // }
        });
        console.log(sortingArray);
        items = Object.keys(sortingArray).map(function(key) {
          // console.log(key, sortingArray[key].rating);
          return [key, sortingArray[key]];
        });
        items.sort(function(first, second) {
          // console.log(second[1], first[1], second[1].distanceFrom4 - first[1].distanceFrom4);
          return first[1].distanceFrom4 - second[1].distanceFrom4;
        });
        
        console.log(items);
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

          yAxis[i] = temp[i][1].discourse;
          if(i == 0) {
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
          } else {
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
    
    // console.log(palette[index]);
    var palette = [
                     ['Greens','YlGnBu','Purples'],
                     ['Greens','YlGnBu','Purples'],
                     ['Greens','YlGnBu','Purples'],
                     ['Blues','BuGn', 'YlOrRd'],
                     ['PuBuGn', 'PuBu', 'BuPu'],
                     ['RdPu', 'PuRd', 'OrRd'],
                     ['Blues', 'Reds', 'Oranges'],
                     ['Reds', 'PuOr', 'BrBG'],
                     ['PRGn', 'Greens', 'RdBu'],
                     ['PRGn', 'Blues', 'RdBu'],
                     ['PRGn', 'Purples', 'RdBu'],
                     ['PRGn', 'Spectral', 'RdBu'],
                     ['PRGn', 'Spectral', 'RdBu'],

                     // ['YIGn', 'RdYIBu', 'Spectral'],

                     // ['Spectral', 'RdYIBu', 'PRGn'],
                     ['YIOrRd', 'OrRd', 'PuRd'],
                     ['PuOr', 'BrBG', 'Blues'],
                     ['Set3', 'Set2', 'Set1'],
                     ['Pastel2', 'Greys', 'Pastel1']];
      // console.log("colors chosen ", palette[index]);
      // console.log(palette[index], index);
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
      console.log(JSONData.getIndex()); 
      console.log(JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions);
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
              console.log("tooltip triggered");
              return (JSONData.returnQuestionJSONData()[0][JSONData.getIndex()].ValueOptions.value[v].definition);
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
    

    var getJSONDataFromFile = function(filename, dataType) {
        var returnJSON = [];
        $.getJSON(filename, function(json) {
          if(dataType == "questions") {
            $.each(json.Questions, function(k, v) {
              // console.log(k, v);
              // console.log(numberOfQuestions);
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
      // console.log(numberOfQuestions);
    }

    var returnQuestionLength = function() {
      return numberOfQuestions;
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

app.service('PHPData', function() {
    // handles the click event, sends the query
  var data = new Array(0);
  var getOutput = function() {
    // console.log("Doin it");

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
      success: function(jsonStuff, textStatus, jqXHR) {
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
