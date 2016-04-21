var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}
// The main application script, ties everything together.
var bodyParser = require('body-parser');
var config = require('./server/config')[env];
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname + '/app'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {
    root: './app/'
  });
});

var server = app.listen(config.port || 3000, function() {
  console.log('Express server listening on %d, in %s' +
    ' mode', server.address().port, app.get('env'));
});

module.exports = app;
