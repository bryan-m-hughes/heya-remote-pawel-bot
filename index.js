/*
The MIT License (MIT)

Copyright (c) 2015 Bryan Hughes <bryan@theoreticalideations.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var express = require('express');
var bodyParser = require('body-parser');
var five = require('johnny-five');

var leftServo;
var rightServo;

module.exports = function(options) {
  var board = new five.Board({
    repl: false,
    io: options.io
  });
  board.on('ready', function() {
    leftServo = new five.Servo({
      pin: options.leftServo,
      type: 'continuous'
    });
    rightServo = new five.Servo({
      pin: options.rightServo,
      type: 'continuous'
    });
    var app = express();
    app.use(bodyParser.json());
    app.get('/isReady', function(req, res) {
      res.send('ready');
    });
    app.post('/update', function(req, res) {
      move(req.body.x, req.body.y);
      res.send('ok');
    });
    var server = app.listen(options.port || 8000, function() {
      console.log('Server listening on port ' + server.address().port);
    });
  });
};

function move(x, y) {
  var leftSpeed;
  var rightSpeed;
  var normalizedAngle = 2 * Math.atan(y / x) / (Math.PI / 2);
  if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
    leftSpeed = 0;
    rightSpeed = 0;
  } else if (x >= 0 && y >= 0) {
    rightSpeed = 1;
    leftSpeed = 1 - normalizedAngle;
  } else if (x < 0 && y >= 0) {
    rightSpeed = -1 - normalizedAngle;
    leftSpeed = 1;
  } else if (x < 0 && y < 0) {
    rightSpeed = -1;
    leftSpeed = 1 - normalizedAngle;
  } else if (x >= 0 && y < 0) {
    rightSpeed = 1 + normalizedAngle;
    leftSpeed = -1;
  }
  if (leftSpeed < 1) {
    leftServo.cw(-leftSpeed);
  } else {
    leftServo.ccw(leftSpeed);
  }
  if (rightSpeed < 1) {
    rightServo.ccw(-rightSpeed);
  } else {
    rightServo.cw(rightSpeed);
  }
}
