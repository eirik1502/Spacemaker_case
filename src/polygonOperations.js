function intersect(polyFeature1, polyFeature2) {}

function intersect(polyFeature1, polyFeature2) {
  return turf.intersect(polyFeature1, polyFeature2);
}

function union(polyFeature1, polyFeature2) {
  return turf.union(polyFeature1, polyFeature2);
}

module.exports = {
  intersect: intersect,
  union: union
};
