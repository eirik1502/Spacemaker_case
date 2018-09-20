mapboxgl.accessToken =
  'pk.eyJ1IjoiZWlyaWsxNTAyIiwiYSI6ImNqbTlhYnJyYjAzcDAzcGxobnI4NWlxZjUifQ.04Pz0fUijny0bx8CgI42yw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-0.1352691650390625, 51.50810140697543],
  zoom: 9
});

module.exports = map;
