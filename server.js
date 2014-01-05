var express = require('express');
var fs = require("q-io/fs");
var Q = require('q');

var app = express();

var BASE_PATH_RE = /\/pathstuff\/morepath\/(.+)/
var RESOURCE_BASEDIR = './'
var CACHE = {};
var PORT = 8082;

function readFilePromise(filename) {
  return fs.read(RESOURCE_BASEDIR + filename).then(function(content) {
    return CACHE[filename] = content.toString();
  });
}

function getResourcePromise(filename) {
  if ((filename in CACHE)) {
    console.log('reading file from cache...');
    return Q(CACHE[filename]);
  }
  console.log('reading file from fs...');
  return readFilePromise(filename);
}

app.get(BASE_PATH_RE, function(req, res) {
  var filename = req.params[0];
    getResourcePromise(filename).then(function(response) {
      res.contentType(filename);
      res.send(response);
    }).fail(function(err) {
      console.log("[ERROR]: ", JSON.stringify(err));
      res.send(404, 404);
    }).done();
});

app.listen(PORT);
console.log('starting server on ' + PORT);

