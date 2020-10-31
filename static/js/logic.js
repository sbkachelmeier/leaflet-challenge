
// Create map?

var myMap = L.map("myMap", {
    center: [36.77, -119],
    zoom: 5
  });

// // Add tile layer?

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: api_key
  
}).addTo(myMap);

// Import data

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson';

fetch(url)
.then(res => res.json())
.then((geojson) => {
  console.log(geojson);
})

function getColor(d){
        return d > 1000
          ? "#800026"
          : d > 90
          ? "#BD0026"
          : d > 70
          ? "#E31A1C"
          : d > 50
          ? "#FC4E2A"
          : d > 30
          ? "#FD8D3C"
          : d > 10
          ? "#FED976"
          : "#FFEDA0";
      
    }
d3.json(url).then(function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h2>" + feature.properties.mag + "</h2>");

            },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: (feature.properties.mag) * 5,
                fillColor: getColor(feature.geometry.coordinates[2]), 
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
        }
    }).addTo(myMap);

        // Add legend
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function() {
          var div = L.DomUtil.create("div", "info legend");
          var limits = [-10, 10, 30, 50, 70, 90];
          
          
      
          // Add min & max
          for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
              '<i style="background:' + getColor(limits[i] + 1) + '"></i> ' +
              limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
          }
          return div;
        };
        legend.addTo(myMap);
      
    
        // Adding legend to the map
        legend.addTo(myMap);
         
  
});
