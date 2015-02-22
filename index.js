var http = require('http'),
    connect = require('connect'),
    request = require('request'),
    colors = require('colors'),
    util = require('util'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({})
    util = require ('util')
    useColors = false
    argv = require('minimist')(process.argv.slice(2));

var target = argv['h'] || 'htpp://localhost:9200'
var useColors = argv['c'] 
var port = argv['p'] || 9100

//
//  Basic Http Proxy Server
//
var app = connect()
  .use(function(req, res){
    req.ts = new Date()
    var _write = res.write;
    res.body = ''
    res.write = function (data) {
      if (data)
        res.body += data.toString()
      _write.call(res, data);
    }

    var _read = req.read 
    req.body = ''
    req.read = function () {
      
      var data = _read.call(req);
      if (data)
        req.body += data.toString()
      return data

    }
    var _end = res.end
    res.end = function (data)
    {
        _end.call(res, data)
        var color =  'red'
        if (res.statusCode < 400)
            color = 'green'
        if (useColors == true) {
          var reqMsg = util.format ('%s REQ %s\n\t%s', req.ts.toISOString(), req.method + ' ' + req.url, req.body.yellow ).yellow
          var resMsg = util.format ('%s RES %s\n\t%s'[color], new Date().toISOString(), res.statusCode, res.body[color] )
          console.log(reqMsg)
          console.log(resMsg)
        } else {
          var reqMsg = util.format ('%s REQ %s\n\t%s', req.ts.toISOString(), req.method + ' ' + req.url, req.body )
          var resMsg = util.format ('%s RES %s\n\t%s', new Date().toISOString(), res.statusCode, res.body)
          console.log(reqMsg)
          console.log(resMsg)
        }
        
    
    }
    
    
    proxy.web(req, res, {
      target: target || 'http://127.0.0.1:9200'
    })
  });

http.createServer(app).listen(port, function(){
  console.log('proxy listen ' + port);
});






