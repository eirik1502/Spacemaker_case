const database = require('./database');
const map = require('./map');
const polygonOperations = require('./polygonOperations');
const data = require('./givenData');

var selectedPolygons = {};

function updateGeomSource(geoJsonData) {
  map.getSource('geomData').setData(geoJsonData);
}

map.on('load', function() {
  console.log(data);

  map.addSource('geomData', {
    type: 'geojson',
    data: data
  });

  database.setGeoJsonDataListener(function(data) {
    updateGeomSource(data);
  });

  //set up firebase listener for data change

  //set up polygonOperation input
  document.addEventListener('keypress', function(e) {
    const keyCode = e.keyCode;
    if (keyCode === 82 || keyCode === 114) {
      //R/r

      database.storeDefaultData();
    }

    if (keyCode === 85 || keyCode === 117) {
      // 'U'

      // var selectedFeatures = map.queryRenderedFeatures({
      //   layers: ['geom'],
      //   filter: ['boolean', ['feature-state', 'selected'], false]
      // });
      // console.log('Selected polygons:', selectedPolygons);
      const selectedPolygonsKeys = Object.keys(selectedPolygons);
      if (selectedPolygonsKeys.length === 2) {
        const union = polygonOperations.union(
          selectedPolygons[selectedPolygonsKeys[0]],
          selectedPolygons[selectedPolygonsKeys[1]]
        );

        //console.log('features:', selectedPolygons.geometry);
        console.log('union result', union);
      }
    } else if (keyCode === 73 || keyCode === 105) {
      // 'I'

      const selectedPolygonsKeys = Object.keys(selectedPolygons);
      if (selectedPolygonsKeys.length === 2) {
        const intersect = polygonOperations.intersect(
          selectedPolygons[selectedPolygonsKeys[0]],
          selectedPolygons[selectedPolygonsKeys[1]]
        );

        console.log('intersect result', intersect);

        const newData = {
          type: 'FeatureCollection',
          features: [intersect]
        };
        console.log('intersection data update: ', newData);

        //construct new geojson of the remaining data
        const currentData = map.getSource('geomData');
        console.log('All data', currentData);

        //TODO: check if data from intersection is valid
        database.storeGeoJsonData(newData);
        // updateGeomSource(newData);
      }
    }
  });

  map.addLayer({
    id: 'geom',
    type: 'fill',
    source: 'geomData',
    layout: {},
    paint: {
      'fill-color': '#088',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        1,
        0.8
      ]
    }
  });

  map.on('click', 'geom', function(e) {
    const clickedFeatures = e.features;

    if (clickedFeatures.length > 0) {
      clickedFeatures.forEach(function(f) {
        if (map.getFeatureState({ source: 'geomData', id: f.id }).selected) {
          delete selectedPolygons[f.id];
          map.setFeatureState(
            { source: 'geomData', id: f.id },
            { selected: false }
          );
        } else {
          selectedPolygons[f.id] = f;
          map.setFeatureState(
            { source: 'geomData', id: f.id },
            { selected: true }
          );
        }
      });
    }
  });
});
