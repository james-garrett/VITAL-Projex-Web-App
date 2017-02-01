<!DOCTYPE html>
<html lang="en">
<html ng-app="rzSliderDemo">

<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title>VITAL Survey</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="./lib/bootstrap.min.css">
  <link rel="stylesheet" href="../dist/rzslider.css"/>
  <link rel="stylesheet" href="demo.css"/>
  <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet"/>
  <!-- <link href="//code.ionicframework.com/nightly/css/ionic.css" rel="stylesheet"/> -->
  <script src="./lib/ionic.bundle.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>

  <!-- <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu"> -->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet"> 

  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
  <script src="//code.jquery.com/jquery-1.12.4.js"></script>
  <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>


</head>

<body> 

  <div ng-controller="MainCtrl">
    <ion-nav-view animation="slide-left-right">
      <ion-content>
        <div class="wrapper">
          <h1 id="mainh1" style="font-family:'Ubuntu'; color:white;">Welcome!</h1>
          <h4 id="mainh4">Hello <span style="color:#FF0000">INSERT-NAME-HERE. </span> You have been granted access to VITAL's self-assessment survey as a <span style="color:#FF0000"> USER-TYPE.</span>
          </h4>
        <!-- <a class="button icon-right ion-checkmark" href="#/first">Let's Begin!</a> -->
        <button class="button icon-right ion-android-create" onclick="location.href='#/first';" href="#/first">Let's Begin! </button>
        <!-- <a class="button icon-right ion-android-create" onclick="location.href='#/first';">Let's Begin! </a> -->
        <!-- http://stackoverflow.com/questions/13425833/how-can-i-change-the-pages-url-when-a-visitor-clicks-a-button -->
        </div>
      </ion-content>
    </ion-nav-view>
  </div>
</body>
<!-- <script src="../Proj/node_modules/angular-1.6.1/angular.js"></script> -->
<script src="./lib/ui-bootstrap-tpls.js"></script>
<script src="../dist/rzslider.js"></script>
<script src="demo2.js"></script>
</html>
