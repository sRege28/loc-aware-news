// app/models/countries.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var countriesSchema = new Schema({
  type: String
});

// the schema is useless so far
// we need to create a model using it
var Country = mongoose.model('countries', countriesSchema);

// make this available to our users in our Node applications
module.exports = Country;
