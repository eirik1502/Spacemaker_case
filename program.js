console.log('Running program');

const testData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},

      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.14007568359375, 51.5027589576403],
            [-0.12325286865234374, 51.5027589576403],
            [-0.12325286865234374, 51.512588580360244],
            [-0.14007568359375, 51.512588580360244],
            [-0.14007568359375, 51.5027589576403]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.1352691650390625, 51.50810140697543],
            [-0.11398315429687499, 51.50810140697543],
            [-0.11398315429687499, 51.51963895991333],
            [-0.1352691650390625, 51.51963895991333],
            [-0.1352691650390625, 51.50810140697543]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.13595581054687497, 51.49698840879303],
            [-0.11226654052734375, 51.49698840879303],
            [-0.11226654052734375, 51.50510971251776],
            [-0.13595581054687497, 51.50510971251776],
            [-0.13595581054687497, 51.49698840879303]
          ]
        ]
      }
    }
  ]
};

mapboxgl.accessToken =
  'pk.eyJ1IjoiZWlyaWsxNTAyIiwiYSI6ImNqbTlhYnJyYjAzcDAzcGxobnI4NWlxZjUifQ.04Pz0fUijny0bx8CgI42yw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-68.13734351262877, 45.137451890638886],
  zoom: 5
});

map.on('load', function() {
  map.addLayer({
    id: 'maine',
    type: 'fill',
    source: testData,
    layout: {},
    paint: {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });
});
