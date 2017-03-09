<!DOCTYPE html>
<html lang="en">
<html ng-app="rzSliderDemo">

<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title>VITAL Survey</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="css/app_stylesheet_mobile.css"/>
  <link rel="stylesheet" href="css/app_stylesheet.css"/>
  <link rel="stylesheet" href="css/app_stylesheet_highres.css"/>
  <link rel="stylesheet" href="./lib/bootstrap.min.css">
  <link rel="stylesheet" href="../dist/rzslider.css"/>
  <script src="js/jsoneditor.js"></script>
  <script src="http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js"></script>
  <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet"/>
  <!-- <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet"/> -->
  <script src="lib/ionic.bundle.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>

  <!-- <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu"> -->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"> 

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>


</head>

<body> 

  <div>
    <ion-nav-view animation="slide-left-right">
      <ion-content>
        <h1>Survey Creator and Editor</h1>
    
    <p>This form allows you to take edit or create surveys:</p>
    
    
    <button id='submit'>Submit (console.log)</button>
    <button id='restore'>Restore to Default</button>
    <button id='enable_disable'>Disable/Enable Form</button>
    <span id='valid_indicator'></span>
    
    <div id='editor_holder'></div>
    
    <script>
      // This is the starting value for the editor
      // We will use this to seed the initial editor 
      // and to provide a "Restore to Default" button.
      
      var valueQuestion = [];
      var entered_value = [];
      var starting_value = [
        {
          "Basic Label": "q1",
          "Default Color": "red",
          "Question Prompt": "This is a question?",
          
          valueArray: {                      
              
                name: "Name1",
                action: "nameaction1",
                definition: "definiton1",
                default: true,
                
                synonyms: [{
                        name: "synname1",
                        action: "synaction1",
                        definition: "syndefinition"
   
                    }]
              
            }
        }
      ];
      // Initialize the editor
      var editor = new JSONEditor(document.getElementById('editor_holder'),{
        // Enable fetching schemas via ajax
        ajax: true,
        
        // The schema for the editor
        schema: {
          type: "array",
          title: "Survey Questions",
          items: {
            title: "Question",
            properties: {
              "Question Prompt": {
                type: "string"
              },
              "Default Color": {
                type: "string"
              },
              "Basic Label": {
                type: "string"
              },
              valueArray: {
                  title: "Values",
                  type: "array",

                  
                  items: 
                    {
                      title: "Value",
                      type: "object",
                      properties: {
                        name: {
                          type: "string"
                        },
                        action: {
                          type: "string"
                        },
                        definition: {
                          type: "string"
                        },
                        default: {
                          type: "boolean"
                        },
                        synonyms: {
                          title: "Synonyms",
                          type: "array",

                          items: {
                            title: "synonym",
                            type: "object",
                            properties: {
                                name: {
                                  type: "string"
                                },
                                action: {
                                  type: "string"
                                },
                                definition: {
                                  type: "string"
                                }
                            }
                          }
                        }
                      }
                    }
                }
            }
          }
},

        
        // Seed the form with a starting value
        startval: starting_value,
        
        // Disable additional properties
        no_additional_properties: true,
        
        // Require all properties by default
        required_by_default: true
      });
      


    var CreateSurveyData = function(JSONFile, newJSONData) {
      // console.log(valueQuestion, valueQuestion[0].length, valueQuestion[valueQuestion.length]);
      // console.log(newJSONData["0"]["Question Prompt"]);
    //   console.log(newJSONData["0"].valueArray.length);
    //   console.log(newJSONData.length, 
        // newJSONData["0"].valueArray.length, 
        // newJSONData["0"].valueArray["0"].synonyms.length);
      var newID = new String("000").concat(valueQuestion[0].length.toString());
      var JSONArr = new Object({"Questions": []});
        for(var questionIndex = 0; questionIndex < newJSONData.length; questionIndex++) {

            var questionTemplate = {
              "id": newID,
              "Question": newJSONData[questionIndex]["Question Prompt"],
              "defaultColor": newJSONData[questionIndex]["defaultColor"],
              "BasicLabel":newJSONData[questionIndex]["defaultColor"],
              "AnswerValue":"",
              "href":newJSONData[questionIndex]["href"],
              "AnswerKeyWords":"",
              "ValueOptions": {
                "value": []}
              };
            
           JSONArr["Questions"][questionIndex] = questionTemplate; 
           // console.log(questionTemplate, JSONArr);
            for(var valueIndex = 0; valueIndex < newJSONData[questionIndex].valueArray.length; valueIndex++) {
              
               var valueTemplate = {
                  "name": newJSONData[questionIndex].valueArray[valueIndex].name,
                  "action": newJSONData[questionIndex].valueArray[valueIndex].action,
                  "definition": newJSONData[questionIndex].valueArray[valueIndex].definition,
                  "default": newJSONData[questionIndex].valueArray[valueIndex].default,
                  "synonyms": {
                    "synonym":[]}
                  }

              JSONArr["Questions"][questionIndex]["ValueOptions"]["value"][valueIndex] = valueTemplate;
              // console.log(JSONArr);
              for(var synonymIndex = 0; synonymIndex < newJSONData[questionIndex].valueArray[valueIndex].synonyms.length; synonymIndex++) {
                
                 var synonymTemplate = {
                  "name": newJSONData[questionIndex].valueArray[valueIndex].synonyms[synonymIndex].name,
                  "action": newJSONData[questionIndex].valueArray[valueIndex].synonyms[synonymIndex].action
                };
                  
              
              JSONArr["Questions"][questionIndex]["ValueOptions"]["value"][valueIndex]["synonyms"]["synonym"][synonymIndex] = synonymTemplate;
              // console.log(JSONArr);
              
              }       
        }   
       }
       var returnJSON = JSON.stringify(JSONArr);
       // console.log(JSONArr);
       console.log(returnJSON);
     }

    storeSurvey = function(survey) {
      sessionStorage.setItem("savedSurvey", survey);
    }

      // Hook up the submit button to log to the console
      document.getElementById('submit').addEventListener('click',function() {
        // Get the value from the editor
        entered_value = editor.getValue();
        console.log("Editor empty", editor.getValue());
        console.log("Starting val", starting_value);
        console.log("questions_id", valueQuestion);
        entered_value = editor.getValue();
        CreateSurveyData(valueQuestion, entered_value);

      });
      
      // Hook up the Restore to Default button
      document.getElementById('restore').addEventListener('click',function() {
        editor.setValue(starting_value);
      });
      
      // Hook up the enable/disable button
      document.getElementById('enable_disable').addEventListener('click',function() {
        // Enable form
        if(!editor.isEnabled()) {
          editor.enable();
        }
        // Disable form
        else {
          editor.disable();
        }
      });
    
    loadJSON = function() {
  
  var returnJSON = [];
  $.getJSON("json/questions.json", function(json) {
    $.each(json.Questions, function(k, v) {
      // console.log(k, v);
    })
    valueQuestion.push(json.Questions);
    // $scope.valueQuestion = json.Questions[0].Question;
    // return json;
  });
  // console.log($scope.valueQuestion);   
  }

  loadJSON();

      // Hook up the validation indicator to update its 
      // status whenever the editor changes
      editor.on('change',function() {
        // Get an array of errors from the validator
        var errors = editor.validate();
        
        var indicator = document.getElementById('valid_indicator');
        
        // Not valid
        if(errors.length) {
          indicator.style.color = 'red';
          indicator.textContent = "not valid";
        }
        // Valid
        else {
          indicator.style.color = 'green';
          indicator.textContent = "valid";
        }
      });
    </script>
      </ion-content>
    </ion-nav-view>
  </div>
</body>
<!-- <script src="../Proj/node_modules/angular-1.6.1/angular.js"></script> -->
<script src="./lib/ui-bootstrap-tpls.js"></script>
<script src="../dist/rzslider.js"></script>
<script src="js/app.js"></script>
</html>
