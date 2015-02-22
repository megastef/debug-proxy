var http = require('http'),
    connect = require('connect'),
    request = require('request'),
    colors = require('colors'),
    util = require('util'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({})
    util = require ('util')


//
//  Basic Http Proxy Server
//
var app = connect()
  .use(function(req, res){
    // modify body here,
    // eg: req.body = {a: 1}.
    req.ts = new Date()
    var _write = res.write;
    res.body = ''
    res.write = function (data) {
      res.body += data.toString()
      _write.call(res, data);
    }

    var _read = req.read 
    req.body = ''
    req.read = function () {
      
      var data = _read.call(req);
      req.body += data.toString()
      //console.log(data.toString())
    }
    var _end = res.end
    res.end = function (data)
    {
        _end.call(res, data)
        var color =  'red'
        if (res.statusCode < 400)
            color = 'green'
        var reqMsg = util.format ('%s REQ %s\n\t%s', req.ts.toISOString(), req.method + ' ' + req.url, req.body.yellow ).yellow
        var resMsg = util.format ('%s RES %s\n\t%s'[color], new Date().toISOString(), res.statusCode, res.body[color] )
        console.log(reqMsg)
        console.log(resMsg)
    
    }
    
    
    proxy.web(req, res, {
      target: process.argv[2] || 'http://127.0.0.1:9200'
    })
  });

http.createServer(app).listen(process.argv[3] ||9100, function(){
  console.log('proxy listen ' + (process.argv[3] ||9100));
});






