
var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , mongoose = require('mongoose')
  , Grid = require('gridfs-stream')
  , dataservice = require('./custom_modules/product-service')
  , imageservice = require('./custom_modules/image-service');
var app = express();
var url = require('url');


// all environments
app.set('port', process.env.PORT || 3001);

app.use(methodOverride());
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}


// mongoose.connect('mongodb://localhost/contacts');

// var contactSchema = new mongoose.Schema({
//   primarycontactnumber: {type: String, index: {unique: 
//   true}},
//   firstname: String,
//   lastname: String,
//   title: String,
//   company: String,
//   jobtitle: String,
//   othercontactnumbers: [String],
//   primaryemailaddress: String,
//   emailaddresses: [String],
//   groups: [String]
// });
// var Contact = mongoose.model('Contact', contactSchema);
// app.use(express.static(__dirname));
// app.get('/', function(request, response){
// 	 response.sendFile(path.join(__dirname + '/index.html'));
//  });

// app.get('/contacts/:number', function(request, response) {
//   console.log(request.url + ' : querying for ' + 
//   request.params.number);
//   dataservice.findByNumber(Contact, request.params.number, 
//   response);
// });

// app.post('/contacts', function(request, response) {
//   dataservice.update(Contact, request.body, response)
// });

// app.put('/contacts', function(request, response) {
//   dataservice.create(Contact, request.body, response)
// });

// app.delete('/contacts/:primarycontactnumber', function(request, response) {
// dataservice.remove(Contact, 
//   request.params.primarycontactnumber, response);
// });

// app.get('/contacts', function(request, response) {
//   console.log('Listing all contacts with ' + request.params.key + '=' + request.params.value);
//   dataservice.list(Contact, response);
// });

mongoose.connect('mongodb://localhost/products');
var mongodb = mongoose.connection;
var gfs = Grid(mongodb.db, mongoose.mongo);

var productSchema = new mongoose.Schema({
  name: String, 
  description: String,
  price: String,
  sku: String
});

var Product = mongoose.model('Product', productSchema);
app.use(express.static(__dirname));

app.put('/products', function(request, response) {
  dataservice.create(Product, request.body, response);
});

app.get('/products', function(request, response) {
  var get_params = url.parse(request.url, true).query;
  console.log({get_params});
  if (Object.keys(get_params).length == 0) {
   	dataservice.list(Product, response);	
  } else {
  	var keys = Object.keys(get_params);
  	var filter = {};
  	for (var i = 0; i < keys.length; i++) {
  		filter[keys[i]] = get_params[keys[i]];
  	}
  	JSON.stringify(dataservice.query_by_args(Product, filter, response));
  }
   
});


app.get('/contacts/:primarycontactnumber/image', 
function(request, response){
  var gfs = Grid(mongodb.db, mongoose.mongo);
  imageservice.getImage(gfs, request.params.primarycontactnumber, response);
});

app.post('/products/:primarycontactnumber/image', 
function(request, response){
  var gfs = Grid(mongodb.db, mongoose.mongo);
  imageservice.updateImage(gfs, request, response);
});

app.put('/products/:primarycontactnumber/image', 
function(request, response){
  var gfs = Grid(mongodb.db, mongoose.mongo);
  imageservice.updateImage(gfs, request, response);
});

console.log('Running at port ' + app.get('port'));
http.createServer(app).listen(app.get('port')); 
