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

var LEFT_FORWARD = 180;
var LEFT_FORWARD_SLOW = 92.5;
var RIGHT_FORWARD = 0;
var RIGHT_FORWARD_SLOW = 87.5;
var LEFT_REVERSE = 0;
var LEFT_REVERSE_SLOW = 87;
var RIGHT_REVERSE = 180;
var RIGHT_REVERSE_SLOW = 93;

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
      move(req.body.direction);
      res.send('ok');
    });
    var server = app.listen(options.port || 8000, function() {
      console.log('Server listening on port ' + server.address().port);
    });
  });
};

function move(direction) {
  console.log('Moving ' + direction);
  switch(direction) {
    case 'none':
      leftServo.stop();
      rightServo.stop();
      break;
    case 'up':
      leftServo.to(LEFT_FORWARD);
      rightServo.to(RIGHT_FORWARD);
      break;
    case 'upright':
      leftServo.to(LEFT_FORWARD);
      rightServo.to(RIGHT_FORWARD_SLOW);
      break;
    case 'right':
      leftServo.to(LEFT_FORWARD);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'downright':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_REVERSE_SLOW);
      break;
    case 'down':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'downleft':
      leftServo.to(LEFT_REVERSE_SLOW);
      rightServo.to(RIGHT_REVERSE);
      break;
    case 'left':
      leftServo.to(LEFT_REVERSE);
      rightServo.to(RIGHT_FORWARD);
      break;
    case 'upleft':
      leftServo.to(LEFT_FORWARD_SLOW);
      rightServo.to(RIGHT_FORWARD);
      break;
  }
}