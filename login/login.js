var express = require('express'),
    conf    = require('./conf');

express()
  .use(express.static(__dirname + '/public'))
  .use(express.bodyParser())
  .post('/', function (req, res, next) {

    console.log(req.body);

    var authUser = req.body.username === conf.username,
        authPass = req.body.password === conf.password,
        message;

    message = authUser
      ? authPass
        ? {status: 'ok'}
        : {err: 'pass'}
      : {err: 'user'};

    res.send(message || {err: 'unknown'});

  })
  .listen(8080);
