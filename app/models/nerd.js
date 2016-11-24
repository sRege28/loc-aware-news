// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* // define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Nerd', {
    type : {type : String, default: ''}
}); */

// create a schema
var countriesSchema = new Schema({
  name: String
  
});

// the schema is useless so far
// we need to create a model using it
var Country = mongoose.model('countries', countriesSchema);

// make this available to our users in our Node applications
module.exports = Country;
