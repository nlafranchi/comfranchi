
var express = require('express')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , errorHandler = require('errorhandler')
  , mongoose = require('mongoose')
  , Grid = require('gridfs-stream')
  , productservice = require('./server/services/product-service')
  , imageservice = require('./server/services/image-service')
  , schemas = require('./server/schemas');
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

var productSchema = new mongoose.Schema(schemas.productSchema);
var Product = mongoose.model('Product', productSchema);
//onsole.log(categorySchema)
// var categorySchema = new mongoose.Schema(schemas.categorySchema);
// var Category = mongoose.model('Category', categorySchema)
// console.log(categorySchema)
app.use(express.static(__dirname));



app.put('/products', function(request, response) {
  productservice.create(Product, request.body, response);
});

app.post('/products', function(request, response) {
  productservice.update(Product, request.body, response);
});

app.get('/products', function(request, response) {
  var get_params = url.parse(request.url, true).query;
  if (Object.keys(get_params).length == 0) {
   
     var resp = productservice.list(Product, response);
    console.log('resp: ' + resp)
  } else {
  	var keys = Object.keys(get_params);
  	var filter = {};
  	for (var i = 0; i < keys.length; i++) {
  		filter[keys[i]] = get_params[keys[i]];
  	}
    
  	JSON.stringify(productservice.query_by_args(Product, filter, response));
  }
});

app.get('/products/:id', function(request, response) {
  if (request.params.id) {
    JSON.stringify(productservice.query_by_args(Product, {_id: request.params.id}, response));
  }
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
