var multilevel = require('multilevel')
var manifest   = require('./manifest.json')
var through    = require('through')

var reconnect = require('reconnect/sock')
reconnect(function (stream) {
  
  db = multilevel.client(manifest)
  stream.pipe(db).pipe(stream)

  db.createLiveStream({tail:true})
    .pipe(through(function(data) {
	console.log(data)
    }))
  setInterval(function(){
   db.put('h' + Math.random(), new Date());
  }, 1000);
}).connect('ws://localhost:8000/ws/taco-demo')
