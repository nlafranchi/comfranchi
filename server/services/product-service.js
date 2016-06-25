  exports.create = (model, requestBody, response) => {
    console.log('hello: ', requestBody);
  var product = toProduct(requestBody, model);
  var name = requestBody.name;
  product.save((error, docsInserted) => {
    console.log('saving', docsInserted);
    if (!error) {
      var res = product.save({});
      console.log("result from save: ", docsInserted, res);
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ productId: docsInserted}));
    } else {
      console.log('Checking if contact saving failed due to already existing name:' + name);
      model.findOne({name: name}, (error, data) => {
        if (error) {
          console.log(error);
          if (response != null) {
            response.writeHead(500, {'Content-Type' : 'text/plain'});    
            response.end('Internal server error');
          }
          return;
          } else {
            var product = toProduct(requestBody, model);
            if (!data) {
              console.log('The contact does not exist. It will be created');
              product.save((error) => {
                if (!error) {
                  product.save();
                  } else {
                    console.log(error);
                  }
                });

                if (response != null) {
                  response.writeHead(200, {'Content-Type' : 'text/plain'});
                  response.end('Created');
              }
              return;
            } else {    
              console.log('Updating contact with primary name:' + name);
              data.name = product.name;
              data.price = product.price;
              data.description = product.description;

              data.save((error) => {
                if (!error) {
                  data.save();
                  response.end('Updated');
                  console.log('Successfully Updated contact with name: ' +  name);
                } else {
                  console.log('Error while saving contact with name:' + name);
                  console.log(error);
                }
              });
            }
          }
        });
      }
    });
}

exports.update = (model, requestBody, response) => {
  var product = toProduct(requestBody, model);

  model.update({_id: requestBody._id}, requestBody, function (err, prod) {
  response.send(prod);
});
}

function toProduct(body, Product) {
 // console.log('toProduct: ', body)
  return new Product({
    name: body.name,
    price: body.price,
    description: body.description
  });
}

exports.list = function (model, response) {
  console.log('model: ', model)
  model.find({}, function(error, result) {
    if (error) {
      console.error(error);
      return null;
    }
    if (response != null) {
      response.setHeader('Content-type', 'application/json');
      response.end(JSON.stringify(result));
    }
    console.log(result)
    return JSON.stringify(result);
  }).sort({name:1});
} ;

exports.query_by_args = function (model, filter, response) {
  //build a JSON string with the attribute and the value
  console.log(filter);
  model.find(filter, function(error, result) {
    if (error) {
      response.writeHead(500, {'Content-Type' : 'text/plain'});
      response.end('Internal server error');
      return;
    } else {
      if (!result) {
        if (response != null) {
         response.writeHead(404, {'Content-Type' : 'text/plain'});
         response.end('Not Found');
        }
        return;
      }
      if (response != null){
        response.setHeader('Content-Type', 'application/json');
        response.send(result);
      }
    }
  });
}; 