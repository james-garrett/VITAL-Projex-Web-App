<!DOCTYPE html>
<html ng-app="rzSliderDemo">

<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>VITAL Survey</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="./lib/bootstrap.min.css">
  <link rel="stylesheet" href="../dist/rzslider.css"/>
  <link rel="stylesheet" href="demo.css"/>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
</head>

<body ng-controller="MainCtrl">
  <ion-nav-view animation="slide-left-right"></ion-nav-view>
<div class="wrapper">
  <header>
    <h1>Question One</h1>
  </header>


  <article>
    <h1>Indicate on the scale which words most accurately describe your level of honesty in everyday life.</h1>
    <h2>Please list key words in the box so you can remember what you were thinking.</h2>
    <h3>Where would you be on this scale?</h3>
    <rzslider class="with-legend"
      rz-slider-model="slider_ticks_legend.value"
      rz-slider-options="slider_ticks_legend.options"
    ></rzslider>
  </article>


</div>

<script id="home.html" type="text/ng-template">
    <ion-view>
      <ion-header-bar class="bar-header">
          <h1 class="title">Main Page</h1>
      </ion-header-bar>    
      <ion-content has-header="true" padding="true">
        <a class="button icon-right ion-chevron-right" href="#/second">Go to the second page!</a>
      </ion-content>
    </ion-view>
  </script>
  <script id="second.html" type="text/ng-template">
    <ion-view>
      <ion-header-bar class="bar-header">
          <h1 class="title">Second Page</h1>
      </ion-header-bar>        
      <ion-content has-header="true" padding="true">
        <a class="button icon-left ion-home" href="#/">Go back!</a>
      </ion-content>
    </ion-view>
  </script> 

</body>
<script src="../Proj/node_modules/angular-1.6.1/angular.js"></script>
<script src="./lib/ui-bootstrap-tpls.js"></script>
<script src="../dist/rzslider.js"></script>
<script src="demo2.js"></script>
</html>
