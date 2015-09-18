var chance = new Chance();

Meteor.methods({
  'createTestData': function () {
    this.unblock();
    createTestData();
  }
});

createTestData = function () {
  Locations.remove({});
  Products.remove({});

  _.times(100, function () {
    var locationId = Locations.insert({
      name: chance.word(),
      latitude: Math.random()*6 + 60,
      longitude: Math.random()*8 + 22,
      type: _.sample(Locations.TYPES)
    });

    _.times(chance.integer({min: 1, max: 10}), function () {
      Products.insert({
        location_id: locationId,
        name: chance.word(),
        company: chance.word(),
        category: _.sample(Products.CATEGORIES),
        price: chance.floating({min: 0.5, max: 10}),
        unit: _.sample(Products.UNITS),
        available: chance.integer({min: 1, max: 10})
      });
    });
  });
};

if (Locations.find({}).count() === 0) {
  createTestData();
}
