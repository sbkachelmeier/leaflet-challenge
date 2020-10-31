// Import data

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson';

fetch(url)
.then(res => res.json())
.then((geojson) => {
  console.log(geojson);
})


// Create map?