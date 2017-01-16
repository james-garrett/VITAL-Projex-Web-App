<!DOCTYPE html>
<html ng-app="rzSliderDemo">

<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AngularJS Touch Slider</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="./lib/bootstrap.min.css">
  <link rel="stylesheet" href="../dist/rzslider.css"/>
  <link rel="stylesheet" href="demo.css"/>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,700' rel='stylesheet' type='text/css'>
</head>

<body ng-controller="MainCtrl">

<div class="wrapper">
  <header>
    <h1>AngularJS Touch Slider</h1>
  </header>

  <article>
    <h2>Simple slider</h2>
    Model: <input type="number" ng-model="minSlider.value"/><br/>
    <rzslider rz-slider-model="minSlider.value"></rzslider>
  </article>

  <article>
    <h2>Range slider</h2>
    Min Value: <input type="number" ng-model="rangeSlider.minValue"/><br/>
    Max Value: <input type="number" ng-model="rangeSlider.maxValue"/><br/>
    <rzslider
      data-rz-slider-model="rangeSlider.minValue"
      data-rz-slider-high="rangeSlider.maxValue"
      data-rz-slider-options="rangeSlider.options"
    ></rzslider>
  </article>

  <article>
    <h2>Range slider with noSwitching=true</h2>
    <rzslider
      rz-slider-model="noSwitchingSlider.minValue"
      rz-slider-high="noSwitchingSlider.maxValue"
      rz-slider-options="noSwitchingSlider.options"
    ></rzslider>
  </article>


  <article>
    <h2>Slider with visible selection bar from a value</h2>
    <rzslider
      rz-slider-model="slider_visible_bar_from_value.value"
      rz-slider-options="slider_visible_bar_from_value.options"
    ></rzslider>
  </article>


  <article>
    <h2>Slider with dynamic selection bar colors</h2>
    <rzslider
      rz-slider-model="color_slider_bar.value"
      rz-slider-options="color_slider_bar.options"
    ></rzslider>
  </article>

  <article>
    <h2>Slider with dynamic pointer color</h2>
    <rzslider
      rz-slider-model="color_slider_pointer.value"
      rz-slider-options="color_slider_pointer.options"
    ></rzslider>
  </article>

  <article>
    <h2>Slider with custom display function</h2>
    <rzslider
      rz-slider-model="slider_translate.minValue"
      rz-slider-high="slider_translate.maxValue"
      rz-slider-options="slider_translate.options"
    ></rzslider>
  </article>

  <article>
    <h2>Slider with custom display function using html formatting</h2>
    <rzslider
      rz-slider-model="slider_translate_html.minValue"
      rz-slider-high="slider_translate_html.maxValue"
      rz-slider-options="slider_translate_html.options"
    ></rzslider>
  </article>


  <article>
    <h2>Slider with ticks</h2>
    <rzslider
      rz-slider-model="slider_ticks.value"
      rz-slider-options="slider_ticks.options"
    ></rzslider>
  </article>

  <article>
    <h2>Slider with ticks at specific positions</h2>
    <rzslider
      rz-slider-model="slider_ticks_array.value"
      rz-slider-options="slider_ticks_array.options"
    ></rzslider>
  </article>

  

  <article>
    <h2>Range slider with ticks and values</h2>
    <rzslider
      rz-slider-model="range_slider_ticks_values.minValue"
      rz-slider-high="range_slider_ticks_values.maxValue"
      rz-slider-options="range_slider_ticks_values.options"
    ></rzslider>
  </article>


  <article>
    <h2>Slider with dynamic tick color</h2>
    <rzslider
      rz-slider-model="slider_tick_color.value"
      rz-slider-options="slider_tick_color.options"
    ></rzslider>
  </article>

  <article>
    <h2>Slider with draggable range</h2>
    <rzslider
      rz-slider-model="slider_draggable_range.minValue"
      rz-slider-high="slider_draggable_range.maxValue"
      rz-slider-options="slider_draggable_range.options"
    ></rzslider>
  </article>


  <article>
    <h2>Slider with all options demo</h2>
    <div class="row all-options">
      <div class="col-md-4">
        <label class="field-title">Min Value: </label><input type="number" ng-model="slider_all_options.minValue"/><br/>
        <label class="field-title"><input type="checkbox" ng-click="toggleHighValue()"> Max Value: </label>
        <input type="number" ng-model="slider_all_options.maxValue" ng-disabled="slider_all_options.maxValue == null"/><br/>
        <label class="field-title">Floor: </label><input type="number" ng-model="slider_all_options.options.floor"/><br/>
        <label class="field-title">Ceil: </label><input type="number" ng-model="slider_all_options.options.ceil"/><br/>
      </div>
      <div class="col-md-4">
        <label class="field-title">Step: </label><input type="number" ng-model="slider_all_options.options.step"/><br/>
        <label class="field-title">Precision: </label><input type="number" ng-model="slider_all_options.options.precision"/><br/>
        <label>Hide limits <input type="checkbox" ng-model="slider_all_options.options.hideLimitLabels"></label><br/>
        <label>Draggable range <input type="checkbox" ng-model="slider_all_options.options.draggableRange"></label>
      </div>
      <div class="col-md-4">
        <label>Show ticks <input type="checkbox" ng-model="slider_all_options.options.showTicks"></label><br/>
        <label>Show ticks values <input type="checkbox" ng-model="slider_all_options.options.showTicksValues"></label><br/>
        <label>Disabled <input type="checkbox" ng-model="slider_all_options.options.disabled"></label><br/>
        <label>Read-Only <input type="checkbox" ng-model="slider_all_options.options.readOnly"></label><br />
        <label>Right to Left <input type="checkbox" ng-model="slider_all_options.options.rightToLeft"></label>
      </div>
    </div>
    <rzslider
      rz-slider-model="slider_all_options.minValue"
      rz-slider-high="slider_all_options.maxValue"
      rz-slider-options="slider_all_options.options"
    ></rzslider>
  </article>
</div>

</body>
<script src="../Proj/node_modules/angular-1.6.1/angular.js"></script>
<script src="./lib/ui-bootstrap-tpls.js"></script>
<script src="../dist/rzslider.js"></script>
<script src="demo.js"></script>
</html>
