'use strict';

var index = require('./index');

var NYC = {
    lat: 40.727093,
    lng: -73.97864
};
//
//var diamond = index.polygonCoordinates(NYC.lat, NYC.lng, 4, 2);
//console.log(diamond);
//printRaw(diamond);

var diamond = index.polygonCoordinates(NYC.lat, NYC.lng, 4, 2, {
    startBearing: 45,
    coordinateOrder: 'xy'
});
console.log(diamond);
printRaw(diamond);


// Use this to throw into this tool for visual verification: http://www.darrinward.com/lat-long/
function printRaw(coordinateArray) {
    coordinateArray.forEach(function each(coordinate) {
        console.log(coordinate[0] + ',' + coordinate[1]);
    })
}
