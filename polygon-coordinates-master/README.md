# polygon-coordinates

Generate coordinates for equilateral polygons around a center point.

## Example

```js
var latitude = 40.727093;
var longitude = -73.97864; 
var hexagon = PolygonCoordinates.polygonCoordinates(latitude, longitude, 6, 1);
/* [ [ 40.73608566148679, -73.97864 ],
  [ 40.73158887501089, -73.9683627060913 ],
  [ 40.72259621361338, -73.96836409475593 ],
  [ 40.71810033851322, -73.97864 ],
  [ 40.72259621361338, -73.98891590524406 ],
  [ 40.73158887501089, -73.98891729390868 ] ] */

```
A destinationCoordinate function is also exposed.
```js
var destinationCoord = PolygonCoordinates.destinationCoordinate(latitude, longitude, 90, 1);
// Result is a point 1km away from pointA, with a 90 degree bearing from north.
/* { latitude: 40.739809328332115
    longitude: -73.99542482446876 } */
```

## Methods

### polygonCoordinates(lat, lng, numVertices, radiusKm, opts)
- lat - latitude
- lng - longitude
- numVertices - number of vertices/sides for the regular polygon
- radiusKm - distance, in km, of each vertex from the center point
- opts
    * coordinateOrder - {'xy' | 'yx'} Order of lat,long in returned coordinates. Default: 'xy', which is lat,long
    * closeRing - {true|false} If true, will return n+1 points for an n-sided polygon, with the last equal to the first
        Default: false.
    * startBearing - Degrees. Bearing at which to start at. Use to rotate the polygon. Default: 0.


## Installation

`npm install polygon-coordinates`

## Tests

`npm test`
