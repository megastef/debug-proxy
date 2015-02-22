var colors = require ('colors')
    hoxy = require('hoxy'),
    util = require ('util')
    argv = require('minimist')(process.argv.slice(2))
    target = argv['h'] || 'htpp://localhost:9200'
    useColors = argv['c'] || false
    port = argv['p'] || 9100
    proxy = new hoxy.Proxy({reverse: target}).listen(port, function(){
       console.log('proxy listen ' + port);
    })

proxy.intercept({
  phase: 'response',
  //fullUrl: 'http://example.com/api/users/:id',
  //mimeType: 'application/json',
  as: 'string'
}, function(req, res){
   var color =  'red'
        if (res.statusCode < 400)
            color = 'green'
        if (useColors == 'true') 
        {
          var reqMsg = util.format ('%s REQ %s\n\t%s', new Date().toISOString(), req.method + ' ' + req.url, req.string.yellow ).yellow
          var resMsg = util.format ('%s RES %s\n\t%s'[color], new Date().toISOString(), res.statusCode, res.string[color] )
          console.log(reqMsg)
          console.log(resMsg)
        } else {
          var reqMsg = util.format ('%s REQ %s\n\t%s', new Date().toISOString(), req.method + ' ' + req.url, req.string )
          var resMsg = util.format ('%s RES %s\n\t%s', new Date().toISOString(), res.statusCode, res.string)
          console.log(reqMsg)
          console.log(resMsg)
        }
})



