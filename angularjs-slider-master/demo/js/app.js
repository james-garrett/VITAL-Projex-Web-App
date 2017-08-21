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
    // Question form for all questions
  })
  .state('second', {
    url: '/second',
    templateUrl: 'q2.html'
    // Does nothing at the moment, other question form template
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'menu.html'
    // Where users select gems for questions
  })
  
  .state('report', {
    url: '/report',
    templateUrl: 'report.html',
    controller: 'ReportCreator'
    // Other summary graph page. Not used currently.
  })

  .state('ParticipantResultsPage', {
    url: '/ParticipantResultsPage',
    templateUrl: 'ParticipantResultsPage.html',
    controller: 'ParticipantResultsCreator'
    // Summary graph page that appears after user answers all question

  })


  .state('ParticipantStart', {
    url: '/ParticipantStart',
    templateUrl: 'ParticipantStart.php'
    // Starting menu for survey takers
  })

  .state('CreateSurvey', {
    url: '/CreateSurvey',
    templateUrl: 'CreateSurvey.php'
    // Interface where users can edit JSON file/survey questions
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

/**
* @param $stateProvider
* @param $urlRouteProvider
* Notes location of all menu files and their names
**/
});



app.controller('MainCtrl', 
	['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 'JSONData', 'Gem', 'PHPData', 'ColorBrewerList',
		function($rootScope, $scope, $timeout, $uibModal, AnswerListener, JSONData, Gem, PHPData, ColorBrewerList) {

    
    $scope.callToGetJSONDATA = function() {
    
    /**
    * Prints json data that is fetched from file to check 
    **/
    }
   
  $scope.callToGetJSONDATA();
  $scope.gem = null;
  //upon the controller being opened, execute this function
  
  $scope.$on('$ionicView.afterEnter', function(){
    // $scope.drawBigHex();

    $scope.appendToMenu();    
    //Appends gems to menu
    if(AnswerListener.getInputValue() != -1 && AnswerListener.getQuestionAnswered() ==true) {
      // AnswerListener.clearAnswerListener();  
      var text_elem_Name = "Q" + JSONData.getIndex() + "gemLabel";
      // var poly_elem_Name = "environments-image" + JSONData.getIndex();
      var poly_elem_Name = "spinObj" + JSONData.getIndex();
     
      $scope.changeCompletedGem(JSONData.getIndex(), 
                                  AnswerListener.getInputValue(), 
                                  document.getElementById(poly_elem_Name),
                                  document.getElementById(text_elem_Name));
      AnswerListener.setQuestionAnswered(false);
      $scope.checkCompletionStatus();

      // $scope.showStorage();
    } 
    /** 
      *After the ionic menu loads, append gems to screen if 
      *a question hasn't been answwered already. If a question was previously
      *done, do nothing
    **/
  });

  $scope.showStorage = function() {
    Object.keys(sessionStorage).forEach(function(elem, index) {
      console.log(index + " " + elem + " " +  sessionStorage.getItem(elem));
    });
  }

  /**
    * Grab JSON data stored in browser session-storage and print to console.
    **/

  $scope.checkCompletionStatus = function() {
    var answers = new Array(0);
    Object.keys(sessionStorage).forEach(function(elem, index) {
      if(elem.indexOf("Question: ") != -1) {
          console.log(elem);
          answers.push(sessionStorage.getItem(elem));
          /**
          * Fetch element from session storage prefixed with "Question:".
          * storeAnswer() and $scope.orderResults both store items starting 
          * with "Question" for storage.
          **/
      }
        
    });
    if(JSONData.returnQuestionLength() == answers.length) {
      console.log("finished!");
      location.href='#/ParticipantResultsPage';
      /**
      * If the number of questions answered == total,
      * take user to graph summary page.
      *
      **/
    }
    console.log(answers, answers.length, JSONData.returnQuestionLength());
  }


  $scope.changeCompletedGem = function(gemIndex, answerIndex, polyElem, textElem) {
    $scope.gem = new Gem();
    textElem.textContent = JSONData.returnQuestionJSONData()[0][gemIndex].ValueOptions.value[answerIndex-1].action;
    /**This is grabbing an "action" from the JSON file storing all questions, going to the the current questions
    * index, going to the current action selected by the user, and grabbing the description for that action.
    **/
    $scope.gem.changeGemColor(answerIndex, gemIndex, polyElem);
    // $scope.callToGetJSONDATA();
    document.getElementsByClassName("environments-image" + gemIndex.toString())[0].style.opacity = "0.5";
    // $scope.gem.createGem(width*2, height*2, gem.setColorPalette(index)[1], 'match_x', polyElem, false);
    /**
    * @param gemIndex int
    * @param answerIndex int
    * @param polyElem 
    * Create a new Gem , grab the text overlaid from the old gem and its color and change it to 
    * match the user's answer from the question just answered. This is executed whenever a question is
    * completed or the user selects any answer on a question page.
    **/
  }

  //Minimal slider config
  $scope.minSlider = {
    value: 10
  };
  //Part of the slider initial config

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  /**
  * @param Object
  * Allows the user to toggle the slider response panel, 
  * not currently being used.
  *
  **/
  

  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  /** 
  * @param Object group
  * Boolean func that checks if a selected group is shown
    * Not currently used.
    **/

  $scope.loadForm = function(index, array, title) {
    
    sessionStorage.setItem("currentIndex", index);
    sessionStorage.setItem("questionJSONData", JSON.stringify($scope.valueQuestion));
    JSONData.setIndex(index);
    location.href='#/first';
  } 
  /**
  * @param int index 
  * @param array array
  *
  * Redirect page towards question form page, save current question index,
  * fetch current index and get that question's data.
  **/


  $scope.getPolyGon = function (drawingAreaWidth, drawingAreaHeight, corners) {
    // var c= document.getElementsByClassName("hexCanvas")[0];
    // var hex = $("#hexCanvas");
    // var c = hex.getContext("2d");
    var width = drawingAreaWidth;
    // var width = 800;
    var height = drawingAreaHeight;
    // var height = 400;
    // corners = 8;
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
    for (var i=0; i<points.length; i++)
    {

        //Adjusting these figures displaces the object array appropriately
        points[i] = {
            x: ((points[i].x * ratio) + drawingAreaWidth/2) 
            ,y: ((points[i].y * ratio) + drawingAreaHeight*0.2)
        };
    }

    return points;

    /**
    * @param int drawingAreaWidth
    * @param int drawingAreaHeight
    * @param int corners
    * @return array
    *
    * Takes custom-set dimensions and generates an array of objects containing
    * the coordinates of each corner in a polygon outline which is drawn on-screen
    * by other functions. Number of corners = number of questions.
    **/
  }

  $scope.appendToMenu = function() {
      var inputs = document.querySelectorAll('svg[class^="environments-image"]');
      console.log(inputs);
      inputs.forEach(function(g, index) {
        g = document.getElementById("spinObj" + index.toString());
        var container = inputs[index];
        var gem = new Gem(container, g);
        var width = container.width.baseVal.value;
        var height = container.height.baseVal.value;
        container.style.height = "100px";
        container.style.width = "100px";
        // container.style.height = $(window).height()/6.10769;
        // container.style.width =  $(window).width()/7.330769230769231;
        // console.log(index);
        gem.createGem(width*4, height*4, ColorBrewerList.setColorPalette(index%14)[1], 'match_x', g, false, index);
        // gem.createGem(width*4, height*4, gem.setColorPalette(index)[1], 'match_x', g, false);
        });

      /**
        *  menu.php generates an array of svg objects, each called an 'environments-image' + current index,
        * for each question read from the question JSON array. This fetches all generated shapes and
        * appends a gem to each one. Each svg has a <g> tag inside of it which the gem is placed on.
        * This was the easiest way to make the gems spin. createGem determines each gem's colour based on
        * its index in the array, so you can see ColorbrewerList service being referenced to determine each 
        * color as a param.
        *
        **/
  }


  $scope.placeGemOnDiv = function(index) {
    var width = (document.getElementById("shapeContainer").offsetWidth)/1.45;
    var height = (document.getElementById("shapeContainer").offsetHeight)/1.45;
    return {"left": $scope.getPolyGon(width, height, JSONData.returnQuestionLength())[index].x,           
                "top": $scope.getPolyGon(width , height, JSONData.returnQuestionLength())[index].y,
                "position": "absolute",
                "display": "block",
                "float": "left",
             //    "margin-left": "50vw",
             // "margin-right": "50vw",
                "border-radius": "50%",
              };
  /**
  *
  * @param index
  * @return Object
  *
  * In menu.html each gem is loaded through an angular loop, with one of the parameters being that
  * each gem's style is determine through ng-style=placeGemOnDiv. This function returns an object which
  * can freely list off each gem's css details. This function fetches each gem's place on the page
  * by repeatedly running getPolGon and getting the next coordinates object, then placing the gem
  * accordingly. It's extremely inefficient and the array could be saved to a service!
  **/
  }

  $scope.return100 = function() {
    return {
            "width": "1000px",
            "height": "1000px",
    };

    /**
    *
    * Can be referenced in ng-stlye on menu.html to get a quick short custom CSS setting set. No longer used.
    *
    **/
  }


  $scope.placeGemLabel = function(index) {
    var width = (document.getElementById("shapeContainer").offsetWidth)/1.45;
    var height = (document.getElementById("shapeContainer").offsetHeight)/1.45;
    var heading = document.getElementById("Q" + index.toString() + "gemLabel");
    var gemBox = document.getElementsByClassName("environments-image" + index.toString())[0];
    var left = ($scope.getPolyGon(width, height, JSONData.returnQuestionLength())[index].x) + (gemBox.width.baseVal.value)/10;
    var top = ($scope.getPolyGon(width, height, JSONData.returnQuestionLength())[index].y) + (gemBox.height.baseVal.value)/4;
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
  /**
  *
  * @param int index
  * @return Object
  *
  * Getting a certain gem's respective question number, set the size, position and content 
  * of the overlaid label, returning the label's css data as an object. This function is run
  * as the ng-style function executed for each gem label loaded through angular on the 
  * question page, taking the returned object as CSS data.
  * 
  **/
  }

  $scope.placeProgress = function() {
    var progress = document.getElementById("questionProgressCounterHeading");
    // var gemBox = document.getElementsByClassName("environments-image" + index.toString())[0];
    var width = ((document.getElementById("shapeContainer").offsetWidth/3)) + "px";
    var height = ((document.getElementById("shapeContainer").offsetHeight/4)) + "px";
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
  /**
  * @return Object
  *
  * Originally placed a progress counter, not currently used.
  **/

  }



  // $(document).keypress(function(e){
  //   if(e.keyCode ==97) {
      
  //     sessionStorage.setItem("Question: " + "0", 6);
  //     sessionStorage.setItem("Question: " + "1", 5);
  //     sessionStorage.setItem("Question: " + "2", 4);
  //     sessionStorage.setItem("Question: " + "3", 3);
  //     sessionStorage.setItem("Question: " + "4", 1);
  //     sessionStorage.setItem("Question: " + "5", 0);
  //     sessionStorage.setItem("Question: " + "6", 5);
  //     sessionStorage.setItem("Question: " + "7", 4);
  //     // printAllSessionsData();

  //     location.href='#/ParticipantResultsPage';
  //   }
  // });

  printAllSessionsData = function() {
    console.log("All sessionStorage data:");
    for (var i = 0; i < sessionStorage.length; i++){
        console.log(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
  }
  /**
  * Simply prints all sessionStoragedata stored so far
  **/
  
      $scope.form = null;
      $scope.valueQuestion = new Array(0);
      $scope.jsonData = {};
      
      JSONData.returnQuestionJSONData('json/questions8.json', "questions", function(data) { 
        sessionStorage.setItem("questionJSONData", JSON.stringify(data)); 
        $scope.valueQuestion = data;

      /**
      * 
      * Runs returnQuestionJSONData and waits for JSON reader to finish before
      * continuing. It captures the question data, converts it to string,
      * and saves it to valueQuestion.
      **/
      });


}]);

app.controller('QuestionFormCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 
                                        'Slider', 'JSONData', 'NotifyingService', 'Gem',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, Slider, 
                                        JSONData, NotifyingService, Gem) {
    // $scope.form = null;
    // var gem = null;

      $scope.init = function() {
        var index = sessionStorage.getItem("currentIndex", index);
        //Gets question index (always 0 at start)
        if(JSONData.getIndex() == -1) {
          // The index is always set to -1 when the quiz beins.
          JSONData.setIndex(sessionStorage.getItem("currentIndex"));
          console(JSON.parse(sessionStorage.getItem("questionJSONData")));
          var array =  JSON.parse(sessionStorage.getItem("questionJSONData"))[0][index];
          /**
          * On the first question, the index is set to the current question number.
          * Get the current question's data from saved question data.
          **/
        } else {
           var array = JSONData.returnQuestionJSONData('json/questions8.json', "questions")[0][index];
           /**
           * 
           * This seems to read the question data from file again, seems pretty inefficient!
           *
           **/
        }
      
        document.getElementById("questionHeadingOnForm").innerText = array.Question;
        var qNum = JSONData.getIndex();
        var slider = new Slider(array);
        $scope.gem = new Gem("QshapeContainer", "spinObj");
        var elem = document.getElementById("QshapeContainer");;
        $scope.gem.createGem(elem.clientWidth*2, elem.clientHeight*2, 'Greys', 'Greys', 
                              document.getElementById("spinObj"), true, qNum);
        $scope.slider_ticks_legend = slider.sliderGet();
        AnswerListener.setInputValue(4);
      /**
      * 
      * Initializes a question form by setting it's question number (relative to other questions in the 
      * JSON array of questions).
      **/
      } 
    $scope.init();
    
      NotifyingService.subscribe($scope, function somethingChanged() {
        gemEvent();
          console.log("NotifyingService caught call");
      /**
      * 
      * If the controller is accessed, catch this event and run gemEvent().
      **/
      });
      
      gemEvent = function() {
      	$scope.gem.changeGemColor(AnswerListener.getInputValue(), JSONData.getIndex(), document.getElementById("spinObj"));
        $scope.gem.changeGemLabel(AnswerListener.getInputValue());
        $scope.gem.changeGemDefinition(AnswerListener.getInputValue());
      /**
      *
      * Change the gem's color, value label and definition to be the current's question index's
      **/
      }

      $scope.$on('JSONDATA', function(event, array) {

      /**
      * @param event
      * @param array
      *
      * Doesn't actually do anything atm
      **/
      });
  /**
  *
  * Handles each question form that the users fills out by grabbing the current question
  * from JSONData and getting the current question index.
  **/
  }]);




app.controller('ParticipantResultsCreator', ['$rootScope','$scope','$timeout', '$uibModal', 'AnswerListener', 
                                        'Slider', 'JSONData', 'NotifyingService', 'Gem',
  function($rootScope, $scope, $timeout, $uibModal, AnswerListener, Slider, 
                                        JSONData, NotifyingService, Gem) {
    /**
      * ParticipantResultsCreator controls the participantsResultsPage content, loading
      * JSON info saved to sessionStorage and numerous services to create a scatter plot
      * summary.
      *
      **/

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

      /**
      * @param Object answerDeviations
      * @param object negDeviations
      * @param Object questionNumberAsArray 
      * 
      *
      * Takes the 3 objects generated in generatePlot() as params for the left 
      * and right lines, as well as the line numbers (answerDeviations, 
      * negDeviations and questionNumberAsArray respectively). The three params
      * contain plot points, label positions and text content. 'data' compounds
      * the three params into 3 line objects, while layout specifies the graph 
      * containing 'data'. All of this is placed in Plotly - an open source 
      * plugin attached to the project.
      **/
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
      /**
      * @param arr
      * @return arr Array
      *
      * Simple fibonacci sequence generator that makes plot points for graph
      **/

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
          return [key, sortingArray[key]];
        });
        items.sort(function(first, second) {
          return first[1].absDistanceFrom4 - second[1].absDistanceFrom4;
        });
        
        return items;

        /**
        * @return Object items
        * 
        * Takes the array of answered questions from SessionStorage 
        * (labelled "QuestionJSONData"), iterates through each answer
        * and places it in sortingArray, where each answer becomes a new
        * associative object with its question theme, answer, distance from
        * the center (and absolute distance from center). After this, sortingArray
        * is iterated through, its results placed in items, sorted from lowest to highest.
        * 
        *
        **/
      }

      $scope.generatePlot = function() {
        temp = $scope.orderResults();
        var t = new Array();
        for(i=0; i < temp.length; i++) {
          x[i] = temp[i][1].distanceFrom4;
          x2[i] = x[i]*-1;
          y[i] = i;
          console.log(i, x[i]);
        /**
        * Takes sorted array from $scope.orderResults and turns results into
        * points along an x axis, y increasing for each result, in a for loop.
        *
        **/

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
          /**
            * Generates plot for first line on graph on left based on results.
            * Also creates coordinates for labels.
            *
            **/
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
          /**
          * Plot for Second line graph on the right, using the inverse of results from
          * sortingArray, then
          * Also creates coordinates for labels.
          *
          **/
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
          /**
          * Third line coordinates, fills out space between other 2 lines in graph.
          * Also creates coordinates for labels.
          **/

          });

          }          
        }
        
        console.log(x, xAxis, xAxis[0]);
        // (Question number (y), Value slider (x), value chosen (text))
      /**
      * Makes 3 arrays based on users results, sorted through 
      * $scope.orderResults, creating coordinates for a concave shape bottom-up
      **/

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
      /**
      * This controller was intended to take JSON data and send it to a google 
      * spreadsheet but I ran out of time before this could be finished.
      *
      **/

      }
      // $scope.init();

}]);

app.factory('Gem', ['$rootScope', '$http', 'JSONData', 'ColorBrewerList', function($rootScope, $http, JSONData, ColorBrewerList) {
  /**
  * Controls how gems are created, how a range of colours is set for each gem, 
  * how big a gem should be, what its labels should be and changing a gem's color,
  * 
  *
  **/

  var Gem = function(container, appendingObj) {
      this.initialize = function() {
        var elem = document.getElementById(container);
      /**
      * @param Object container
      * @param Object appendingObj
      *
      * Initially intented to set a gem as an object consisting of 
      * its container and that container's container (appendingObj), but not used 
      * at the moment.
      *
      **/

      }

  setGemColorRange = function(gemColor, color1, color2, color3) {
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

    /**
    * 
    * @param int gemColor
    * @param Object color1
    * @param Object color2
    * @param Object color3
    *
    * color1, color2, and color3 are arrays of hex values for colours, together
    * forming numerous gradient patterns for a gem when combined. gemColor is an integer
    * which determines which combination of the 3 colors is returned. Between 
    * 1-2 colors arrays are returned in a tuple either with 'match_x' 
    * (which just tells changeGemColor to make it's gem 1 gradient).
    * 
    **/
  }


  determineGemRadius = function(height, width) {
    switch(height) {
      case height > 800:
          return [height+100, width+100];
      default:
          return [height+200, width+200]
    }

  /**
  * @param int height
  * @param int width
  * @return Array(int)
  *
  * Determines a gem's radius based on its height, returns new dimensions.
  **/
  }

  this.createGem = function(gheight, gwidth, x_color, y_color, bg, solo, Qindex) {
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
          
          // var gemName = "prettyGem" + (bg.id).slice(-1);
          console.log(bg.id);
          var gemName = "prettyGem" + Qindex.toString();
          gem.setAttribute("id", gemName);
          $('#' + gemName).remove();  
          console.log(bg.id, gemName);
        }
        bg.appendChild(gem);
  /**
  * @param int gheight
  * @param int gwidth
  * @param array(array()) x_color
  * @param array(array()) y_color
  * @param bg
  * @param boolean solo
  * @param int Qindex
  *
  * Using an open-source library called Trianglify, a textured shape consisting of differently coloured
  * polygons can be assembled, with 2 arrays of colours (x_colors, y_colors) that the gems fade between
  * to create 2-color gradients. The variance in the polygon shapes, size of polygons can all be configured 
  * within the Trianglify object. The method also determines what its naming convention should be by 
  * "solo", which determines whether to name it "#prettygem" or #prettyGem1 depending on Qindex - which
  * determines what the number on the end will be. It's admittedly quite ridiculous how I've set this up.
  *
  *
  **/

  }

  this.changeGemColor = function(gemColor, currentIndex, bg) {
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
    // set up the base pattern
    this.createGem(dimensions[0], dimensions[1], x, y, bg, true);
  }

  /**
  * @param gemColor
  * @param int currentIndex
  * @param bg
  *
  * Depending on what index (numbered from 0 to 7), we create a range of colour schemes fetched
  * from ColorBrewerList (3 colors), set 2 gradients (arrays of similarly shaded colours), and input it as
  * elements in a created gem. gem dimensions (arrays of x/y positions and coordinates) for its size are 
  * also given to a created gem, as well as the id of the background that the gem is being appended to.
  * We also send the gem a boolean value (true) to tell it whether or not it's creating an individual gem for
  * a question, or one gem as part of an array displayed the menu.
  *
  **/

  this.changeGemDefinition = function(value) {
     document.getElementsByClassName("valueExplanation")[0].innerHTML = JSONData.returnQuestionJSONData('json/questions8.json', "questions")[0][JSONData.getIndex()].ValueOptions.value[value-1].definition;
  /**
  * @param int value
  *
  * Get's current question's "definition" (explanation) by grabbing its index in the array of possible responses
  * and applying whatever chosen value the user has selected and setting the gem's definition to the indexed value.
  **/

  }
  this.changeGemLabel = function(value) {
    var gemTxt = document.getElementById("gemLabel");

    var description = JSONData.returnQuestionJSONData('json/questions8.json', "questions")[0][JSONData.getIndex()].ValueOptions.value[value-1].action;
    document.getElementById("gemLabel").textContent = description;
    if(description.length > 14) {
      var split = description.match(/.{1,14}/g);
    }

    /**
    * @param int value
    * 
    * Similar to changeGemDefinition, but places a label overlaid on a gem describing the current value selected.
    * It also divides up the label into multiple lines if the label is more than 14 characters, so that it stays within
    * a gem's radius.
    **/

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
      /**
      * @param array(Array(String) questionJSONData
      * 
      * Takes an associative array questionJSONData and inputs it into a slider, while saving this question's
      * index to this.indexChosen, and setting the valueSelected (slider position) to the default position in
      * the middle.
      **/
    };

    notify = function() {
        NotifyingService.notify();

    /**
    *
    * Simple event handler which can be attached to objects to trigger when they change.
    **/
    }

    this.slider_ticks_legend = {};

    backToMenu = function() {
      console.log("Storing answer of " + JSONData.getIndex() + " " + AnswerListener.getInputValue());
      console.log(JSONData.getIndex());
      storeAnswer(JSONData.getIndex(), AnswerListener.getInputValue());
      AnswerListener.setQuestionAnswered(true);
      location.href='#/menu';


    /**
    *
    * Stores the current selected response, saves it to the AnswerListener, marks this question as finished,
    * and redirects the user to the menu again.
    **/
    }

    storeAnswer = function(index, answer) {
      console.log(answer);
      console.log(JSONData.getIndex());
      sessionStorage.setItem("Question: " + index.toString(), answer); /*Store answer*/
      console.log(sessionStorage.getItem(index.toString()));
    
    /**
    * @param int index
    * @param int answer
    *
    * Gets the current question index and the current answer selected from the questionaire
    * and saves it to sessionStorage.
    **/
    }


    this.setSlider = function(questionJSONData) {
      this.slider_ticks_legend = {
          value: 4,
          options: {
            showTicksValues: true,
            ceil: 7,
            floor: 1,

            //There are 7 values/answers to each question, so we set the ceiling and floor to this range.

            stepsArray: [
              {value: 1, legend: questionJSONData.ValueOptions.value[0].name},
              {value: 2, legend: questionJSONData.ValueOptions.value[1].name},
              {value: 3, legend: questionJSONData.ValueOptions.value[2].name},
              {value: 4, legend: questionJSONData.ValueOptions.value[3].name},
              {value: 5, legend: questionJSONData.ValueOptions.value[4].name},
              {value: 6, legend: questionJSONData.ValueOptions.value[5].name},
              {value: 7, legend: questionJSONData.ValueOptions.value[6].name}

              //These are the selectable points along the slider, each divot labelled by it's value name.
              
            ],

            // onChange: this.onChangeListener,

            showTicksValues: true,

            // ticksValuesTooltip: function(value) {
            //   console.log("tooltip triggered");
            //   return 'Tooltip for ';
            // },

            ticksTooltip: function(v) {
              return (JSONData.returnQuestionJSONData('json/questions8.json', "questions")[0][JSONData.getIndex()].ValueOptions.value[v].definition);
              //Ensures that each selected value's definition/explanation is loaded from the JSON file.
            },

            getTickColor: function (value) {
              var colorRange = ColorBrewerList.setColorPalette(JSONData.getIndex());
              if (value < 3) 
                return (ColorBrewerList.searchForColor(colorRange[0]));
              if (value < 6)
                return ColorBrewerList.searchForColor(colorRange[1]);
              if (value < 9)
                return ColorBrewerList.searchForColor(colorRange[2]);
              return '#2AE02A';

              // Each tick is coloured a similar shade to the current displayed gem, to give the users visual indication of
              // the answer they selected.
          },

            getPointerColor: function(v) {              
              AnswerListener.setInputValue(v);
              notify();
              return v;
            // This is meant to listen for pointer color, but it also takes the index (int) selected. Notify triggers whenever
            // the slider changes, and the value v is saved to AnswerListener.
            }
          }
      };
    }

    this.sliderGet = function() {
        return this.slider_ticks_legend;
    // The returned value is just the slider object as a whole.
    }

    this.initialize();
    this.setSlider(questionJSONData);

  };
  return Slider;

  /**
  *
  * This factory handles loading, configuring and changing the slider object on each question. 
  **/
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
/**
*
* @param Scope rootScope
*
* Handy function which returns an event whenever a factory is created.
**/
});



app.service('JSONData', function() {
  /**
  * Fetches question data from from local file directory
  * and parses data.
  **/
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
                  numberOfQuestions++;
                })
                questionJSONData.push(json.Questions);
                callback(questionJSONData);

              } else if(dataType == "report") {
                console.log("report");
                $.each(json.Results, function(k, v) {
                  // console.log(k, v);
                })
                reportJSONData.push(json.Results);
              
            }
      });
      if((typeof(questionJSONData) == "undefined") == true) {
      }
      // returnQuestionJSONData();

    /**
    * @param String filename 
    * @param String dataType
    * @param callback
    *
    * Gets the json file given from the filename, and will either process data
    * for a question set or a generated report. If dataType == "questions",
    * the function keeps track of the number of questions. If dataType == "report"
    * then the function doesn't track question total.
    *
    **/
    }

    var returnQuestionLength = function() {
      return numberOfQuestions;
    // If this service is given questions to process, it can return its count.
    }

    var setQuestionJSONData = function(val) {
        questionJSONData = val;
    //  Unused function.
    }

    var returnQuestionJSONData = function(filename, dataType, callback) {
      if(questionJSONData.length == 0) {
          getJSONDataFromFile(filename, dataType, callback);
      }
      return questionJSONData;
    }
    /**
    * Wrapper function which prevents website running asynchronously while
    * getJSONDataFromFile fetches question data and making an incomplete web page.
    * callback can be null if getJSONDataFromFile is already loaded (making questionJSONData.length != 0),
    * and the question data will just be returned.
    *
    **/


    var returnReportJSONData = function() {
      return reportJSONData;
    //Returns JSON data used for post-quiz report
    }

    var setIndex = function(field) {
      indexChosen = field;
    // Changes the current question number set to field
    }

    var getIndex = function(field) {
    // Gets the current question number (when user is doing question in menu.html)
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

    /**
    * return Object
    * 
    * This service allows all JSON question data to be managed externally
    * to any factory if needed, acting as a private storage unit for hidden
    * global variables. 
    **/
});

app.service('PHPData', function() {
    // handles the click event, sends the query
  var data = new Array(0);
  var getOutput = function() {
    console.log("Doin it");
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

  /**
  * Grabs JSON data array of question content
  * from a server, instead of a local file directory.
  **/
  }

  var returnPHPData = function() {
    return data;

  /**
  * @return Array(Object) data
  * 
  * Returns array fetched from server.
  **/
  }

  return {
    getOutput: getOutput,
    returnPHPData: returnPHPData,
  };

  /**
  * This is an incomplete service which can be used to load question JSON data
  * from a myPHPAdmin server.
  **/ 
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

    /**
    * @return Object colorList

    * Returns colorList in its entirety.
    *
    **/
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
    return palette[index];

  /**
  * @param int index
  * @return Array(String)
  *
  * Returns array of color combinaions based on index.
  *
  **/  
  }

  var searchForColor = function(color) {
    var returnColor = '';
    Object.keys(colorList.color).forEach(function(elem, index) {
        
        var colorName = colorList.color[index].color;
        if(colorName == color) {
          var array = colorList.color[index].array;
          returnColor = (colorList.color[index].array[3]);
        }
      });
    return returnColor;
  
  /**
  * @param String color
  * @return Array(string) returnColor
  *
  * Gives controller a string for a color array found in colorList, and iterates
  * through each color until it finds an object with a matching "color" as
  * color, then returning the arary associated with that color.
  **/

  }

  var getContrast50 = function(index) {
    var hexcolor = searchForColor((setColorPalette(index))[1]);
    console.log(searchForColor((setColorPalette(index))[1]));
    return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'black':'white';
  /** 
  * Don't remember what this function is used for, never used. Assume it returns
  * array of colours from black to white.
  *
  **/

}



  return {
    returnColorList: returnColorList,
    searchForColor: searchForColor,
    setColorPalette: setColorPalette,
    getContrast50: getContrast50,
  };

  /**
  * ColorBrewerList holds a colorList in an isolated service which users cannot access, 
  * but factories such as slider and Gem can. 
  **/
});



app.service('AnswerListener', function() {
  var inputValue = -1;
  var questionAnswered = false;
  var answeredQuestions = 0;
  var setInputValue = function(value) {
    inputValue = value;
  /**
  * @param int value 
  *
  *Stores a user's answer index along a slider 
  * (value) on the service.
  **/
  }

  var getInputValue = function(){
    return inputValue;

  /**
  *
  * Fetches user's last answer.
  **/
  }

  var clearAnswerListener = function() {
    inputValue = -1;
    

    /**
    * Sets inputValue to -1 so that if other functions fetch
    * user's answer, they will know an no answer was give if 
    * -1 is returned
    **/
  }

  var setQuestionAnswered = function(setting) {
      questionAnswered = setting;
      answeredQuestions++;
      console.log(answeredQuestions);
      
      /**
      * @param int Setting
      * Increments counter tracking answered questions,
      * keeps track of which question number was just 
      * answered.
      * 
      **/
  }

  var getQuestionsAnsweredCount = function() {
    return answeredQuestions;

    /**
    * Gets questions answered counter.
    **/
  }

  var getQuestionAnswered = function() {
    return questionAnswered;
    /**
    * Gets index of last question answered.
    **/
  }

  return {
    setInputValue: setInputValue,
    getInputValue: getInputValue,
    clearAnswerListener: clearAnswerListener,
    setQuestionAnswered: setQuestionAnswered,
    getQuestionAnswered: getQuestionAnswered,
  };
  /**
  * Takes users input answers and stores them in a service
  * isolated from users and factories, which persists as control
  * between MainCtrl, QuestionFormCreator, and
  * ParticipantResultsCreator is tranferred for the interface.
  **/

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
  // Quick function intended to have labels appear on mouseOver, unsure if this is still even used!
});

//Use $rootScope to contain data from multiple controllers --> each controller should be for each state
