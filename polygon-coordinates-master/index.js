'use strict';

var defaults = require('lodash.defaults');

var EARTH_RADIUS = 6371.392896; // kilometers

function destinationCoordinate(latitude, longitude, bearingDegrees, distanceKm) {
  var origLatitude = degreesToRadians(latitude);
  var origLongitude = degreesToRadians(longitude);
  var angularDistance = distanceKm/EARTH_RADIUS;
  var bearingRadians = degreesToRadians(bearingDegrees);
  var destLatitude = Math.asin(Math.sin(origLatitude)*Math.cos(angularDistance) +
      Math.cos(origLatitude)*Math.sin(angularDistance)*Math.cos(bearingRadians));
  var destLongitude = origLongitude +
      Math.atan2(Math.sin(bearingRadians)*Math.sin(angularDistance)*Math.cos(origLatitude),
          Math.cos(angularDistance)-Math.sin(origLatitude)*Math.sin(destLatitude));
  return {
    latitude: radiansToDegrees(destLatitude),
    longitude: radiansToDegrees(destLongitude)
  };
}

function polygonCoordinates(latitude, longitude, numVertices, radiusKm, opts) {
  opts = opts || {};
  opts = defaults(opts, {
    coordinateOrder: 'xy',
    closeRing: false,
    startBearing: 0
  });

  var coordinateArray = [];
  var centralAngle = 360/numVertices;

  var bearing = opts.startBearing;
  while (bearing < 360 || (bearing > 360 && (bearing % 360 < opts.startBearing))) {
    var coordinate = destinationCoordinate(latitude, longitude, bearing, radiusKm);
    var coordinateTuple = [coordinate.latitude, coordinate.longitude];
    if (opts.coordinateOrder == 'yx') {
      coordinateTuple.reverse();
    }
    bearing = bearing + centralAngle;
    coordinateArray.push(coordinateTuple);
  }
  if (opts.closeRing) {
    coordinateArray.push(coordinateArray[0]);
  }
  return coordinateArray;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI/180;
}
function radiansToDegrees(radians) {
  return radians * 180/Math.PI;
}

module.exports = {
  getDestinationCoordinate: destinationCoordinate,
  polygonCoordinates: polygonCoordinates
};
