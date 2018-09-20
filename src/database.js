const defaultData = require('./givenData');

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBmY8_suYTshzhh8IISgjdt91vkf21qzQo',
  authDomain: 'spacemaker-case.firebaseapp.com',
  databaseURL: 'https://spacemaker-case.firebaseio.com',
  projectId: 'spacemaker-case',
  storageBucket: 'spacemaker-case.appspot.com',
  messagingSenderId: '379859241463'
};
firebase.initializeApp(config);
database = firebase.database();
console.log('Firebase initialized');

function storeDefaultData() {
  database.ref('/').set(defaultData);
}

function setGeoJsonDataListener(callback) {
  database.ref('/').on('value', function(snapshot) {
    callback(snapshot.val());
  });
}

function storeGeoJsonData(data) {
  database.ref('/').set(data);
}

module.exports = {
  storeDefaultData: storeDefaultData,
  setGeoJsonDataListener: setGeoJsonDataListener,
  storeGeoJsonData: storeGeoJsonData
};
