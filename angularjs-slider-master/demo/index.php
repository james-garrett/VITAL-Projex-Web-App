<!DOCTYPE html>
<html lang="en">
<html ng-app="rzSliderDemo">

<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title>VITAL Survey</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="css/resolutionChanges.css"/>
  <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/trianglify/0.4.0/trianglify.min.js"></script> -->
  <link rel="stylesheet" href="css/app_stylesheet.css"/>
  <link rel="stylesheet" href="./lib/bootstrap.min.css">
  

  
  <link rel="stylesheet" href="../dist/rzslider.css"/>
  <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet"/>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">  
  <script src="./lib/ionic.bundle.js"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="hexagonGenerator.js"></script>
  <script src="trianglify_uncompressed.js"></script>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>

<body ng-controller="MainCtrl"> 

  <div>
    <ion-nav-view animation="slide-left-right">
      <ion-content>
        <div class="wrapper">
          <h1 id="mainh1" style="font-family:'Ubuntu'; color:white;">Welcome!</h1>
          <h4 id="mainh4">Choose a user type to begin.
          </h4>
        <!-- <a class="button icon-right ion-checkmark" href="#/first">Let's Begin!</a> -->
        <button class="button icon-right ion-android-clipboard" onclick="location.href='#/ParticipantStart';" href="#/ParticipantStart">Participant</button>
        <button class="button icon-right ion-hammer" onclick="location.href='#/CreateSurvey';" href="#/CreateSurvey">Facilitator </button>
        <button class="button icon-right ion-wrench" onclick="location.href='#/menu';" href="#/ParticipantStart">Admin</button>
        <button class="button icon-right ion-settings" onclick="location.href='#/menu';" href="#/ParticipantStart">System Admin</button>
        <!-- <a class="button icon-right ion-android-create" onclick="location.href='#/first';">Let's Begin! </a> -->
        <!-- http://stackoverflow.com/questions/13425833/how-can-i-change-the-pages-url-when-a-visitor-clicks-a-button -->
        </div>
      </ion-content>
    </ion-nav-view>
  </div>
</body>
<script type="text/javascript">
	localStorage.clear();
	sessionStorage.clear();	
</script>
<!-- <script src="../Proj/node_modules/angular-1.6.1/angular.js"></script> -->
<script src="./lib/ui-bootstrap-tpls.js"></script>

<script src="../dist/rzslider.js"></script>
<script src="js/app.js"></script>
<script src="./lib/require.js"></script>
</html>
