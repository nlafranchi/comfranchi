exports.updateImage = function(gfs, request, response) { 
    var _name = request.params.name; 
    console.log('Updating image for:' + _name); 
    request.pipe(gfs.createWriteStream({    _id: _primarycontactnumber,    filename: 'image',    mode: 'w'  })); 
    response.send("Successfully uploaded image for primary   contact number: " + _primarycontactnumber);
};

exports.getImage = function(gfs, _primarycontactnumber, response) {
  console.log('Requesting image for primary contact number: ' + _primarycontactnumber);
  var imageStream = gfs.createReadStream({
    _id : _primarycontactnumber,
    filename : 'image',
    mode : 'r'
  });

  imageStream.on('error', function(error) {
    response.send('404', 'Not found');
    return;
  });

  response.setHeader('Content-Type', 'image/jpeg'); 
  imageStream.pipe(response);
}; 