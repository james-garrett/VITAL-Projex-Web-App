'use strict';

var test = require('tape');

var index = require('./index');

var polygonCoordinates = index.polygonCoordinates;
var getDestinationCoordinate = index.getDestinationCoordinate();

var somewhereInNYC = {
    lat: 40.727093,
    lng: -73.97864
};

test('it draws a triacontakaihexagon in NYC, default case', function t(assert) {
    var result = polygonCoordinates(somewhereInNYC.lat, somewhereInNYC.lng, 36, 1);
    assert.looseEqual(result, [
        [ 40.73608566148679, -73.97864 ],
        [ 40.73594902442798, -73.97657914786018 ],
        [ 40.73554326655348, -73.97458093842361 ],
        [ 40.73488072137347, -73.9727061080393 ],
        [ 40.733981527284136, -73.97101163863226 ],
        [ 40.7328730147921, -73.96954902438783 ],
        [ 40.73158887501089, -73.9683627060913 ],
        [ 40.73016813482464, -73.96748872081942 ],
        [ 40.72865396999659, -73.96695360801152 ],
        [ 40.72709239241619, -73.96677360503303 ],
        [ 40.72553085147757, -73.96695415643799 ],
        [ 40.724016792155346, -73.96748975152407 ],
        [ 40.72259621361338, -73.96836409475593 ],
        [ 40.72131227211826, -73.96955060351901 ],
        [ 40.72020397063786, -73.97101321776346 ],
        [ 40.71930497483462, -73.97270749670398 ],
        [ 40.71864259129891, -73.97458196912831 ],
        [ 40.71823693893023, -73.9765796962867 ],
        [ 40.71810033851322, -73.97864 ],
        [ 40.71823693893023, -73.98070030371329 ],
        [ 40.71864259129891, -73.98269803087167 ],
        [ 40.71930497483462, -73.98457250329602 ],
        [ 40.72020397063786, -73.98626678223653 ],
        [ 40.72131227211826, -73.98772939648097 ],
        [ 40.72259621361338, -73.98891590524406 ],
        [ 40.724016792155346, -73.98979024847593 ],
        [ 40.72553085147757, -73.99032584356199 ],
        [ 40.72709239241619, -73.99050639496696 ],
        [ 40.72865396999659, -73.99032639198848 ],
        [ 40.73016813482464, -73.98979127918057 ],
        [ 40.73158887501089, -73.98891729390868 ],
        [ 40.7328730147921, -73.98773097561217 ],
        [ 40.733981527284136, -73.98626836136773 ],
        [ 40.73488072137347, -73.9845738919607 ],
        [ 40.73554326655348, -73.98269906157638 ],
        [ 40.73594902442798, -73.9807008521398 ]
    ], ' - plotted on a map and its beautiful');
    assert.end();
});

test('it should set the radius in km', function t(assert) {
    var result = polygonCoordinates(somewhereInNYC.lat, somewhereInNYC.lng, 4, 2);
    assert.looseEqual(result,
        [
            [40.74507832297359, -73.97864],
            [40.7270905696648, -73.95490721049943],
            [40.70910767702642, -73.97864],
            [40.7270905696648, -74.00237278950055]
        ]
    );
    assert.end();
});

test('respect the opt.coordinateOrder and create yx coordinates', function t(assert) {
    var result = polygonCoordinates(somewhereInNYC.lat, somewhereInNYC.lng, 4, 2, {
        coordinateOrder: 'yx'
    });
    assert.looseEqual(result,
        [
            [ -73.97864, 40.74507832297359 ],
            [ -73.95490721049943, 40.7270905696648 ],
            [ -73.97864, 40.70910767702642 ],
            [ -74.00237278950055, 40.7270905696648 ]
        ]
    );
    assert.end();
});


test('respect opt.closeRing and close the ring', function t(assert) {
    var result = polygonCoordinates(somewhereInNYC.lat, somewhereInNYC.lng, 4, 2, {
        closeRing: true
    });
    assert.looseEqual(result,
        [
            [40.74507832297359, -73.97864],
            [40.7270905696648, -73.95490721049943],
            [40.70910767702642, -73.97864],
            [40.7270905696648, -74.00237278950055],
            [40.74507832297359, -73.97864]
        ]
    );
    assert.equal(result.length, 5);
    assert.equal(result[0], result[result.length - 1]);
    assert.end();
});

test('respect opt.startBearing and create a rotated polygon', function t(assert) {
    var result = polygonCoordinates(somewhereInNYC.lat, somewhereInNYC.lng, 4, 2, {
        startBearing: 45
    });
    assert.looseEqual(result,
        [
            [ 40.739809328332115, -73.96185517553124 ],
            [ 40.7143742413325, -73.96186158949864 ],
            [ 40.7143742413325, -73.99541841050136 ],
            [ 40.739809328332115, -73.99542482446876 ]
        ]
    );
    assert.equal(result.length, 4);
    assert.end();
});
