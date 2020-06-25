// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// let map = L.map("mapid").setView([30, 30] , 2);


// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
//             // GeoJSON data coordinates are set with the first parameter as x (longitude) and y (latitude)
// ]};

// // Grabbing our GeoJSON data and add marker
// L.geoJson(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     // add city popupmarker using dot notation
//     .bindPopup("<h2>" + `Airport Code: ${feature.properties.faa}` + "</h2><p>Airport Name:" + feature.properties.name + '</p>');
//   }

// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
}); 


// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [30, 30],
	zoom: 2,
	layers: [streets]
})
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// To read an external .json file, we need to use the d3.json() method. 
// To use the d3.json() method, we need to have the <script src="https://d3js.org/d3.v5.min.js"></script> file in the index.html page.

//  Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Daniel-Schroeder15/Mapping_Earthquakes/master/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      console.log(feature);
      return L.marker(latlng)
      .bindPopup("<h2>" + `Airport Code: ${feature.properties.faa}` + "</h2><p>Airport Name:" + feature.properties.name + '</p>');
}}).addTo(map);
});