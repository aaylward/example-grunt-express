express = require('express')
fs = require('q-io/fs')
Q = require('q')

app = express()

BASE_PATH_RE = /\/pathstuff\/morepath\/(.+)/
RESOURCE_BASEDIR = 'fixtures/'
CACHE = {}
PORT = 8082

readFilePromise = (filename) ->
  fs.read("#{RESOURCE_BASEDIR}#{filename}").then (content) ->
    return CACHE[filename] = content.toString()

getResourcePromise = (filename) ->
  if filename of CACHE
    console.log 'reading file from cache...'
    return Q CACHE[filename]
  console.log 'reading file from fs...'
  return readFilePromise(filename)

app.get BASE_PATH_RE, (req, res) ->
  filename = req.params[0]
  getResourcePromise(filename).then (response) ->
    res.contentType filename
    res.send response
  , (err) ->
    console.log "[ERROR]: ", JSON.stringify(err)
    res.send 404
  .done()

app.get '/bust-cache', (req, res) ->
  CACHE = {}
  res.send 'busted'

app.listen PORT
console.log 'starting server on ' + PORT

