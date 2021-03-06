var mongoose = require( 'mongoose' );
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  dbURI = 'mongodb://test:test@ds056727.mongolab.com:56727/ca4_mean_wikipedia';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});



var wikiSchema = mongoose.Schema({
      title: { type: String, index: true},
      url: { type: String},
      abstract: { type: String},
      categories: {type: [{type: String}], index: true},
      links: {type: [{type: String}], index: true},
      headings: [{heading: {type: String}, position: {type: Number}}]},
    { collection: 'wiki' }
);

mongoose.model('wiki', wikiSchema);


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
//var usersSchema = new mongoose.Schema({
//  userName : String,
//  email: {type: String, unique: true},
//  pw: String,
//  created: { type: Date, default: new Date() }
//});
//
//mongoose.model( 'User', usersSchema,"testusers" );

