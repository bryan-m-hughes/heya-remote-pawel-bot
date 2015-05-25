Heya Remote Pawel Bot Driver
============================

The Heya Remote Pawel Bot Driver is a sibling module for use with the [Remote Pawel Bot driver](https://github.com/bryan-m-hughes/heya#remote-pawel-bot) in Heya, a sumobot platform.

The remote driver allows the primary Heya instance to run on a different machine than the driver. For example, let's say you want to have a Raspberry Pi controlling motors, but a laptop generating the input, then you want to use this module.

Install with NPM:

```
npm install heya-remote-pawel-bot
```

## Remote Driver configuration

This is the code that runs on the Raspberry Pi, using the above example.

```JavaScript
var Raspi = require('raspi-io');

require('heya-remote-pawel-bot')({
  io: new Raspi(),
  leftServo: 'PWM0',
  rightServo: 'PWM1'
});
```

## Heya Configuration

This is the code that runs on the laptop, using the above example.

```JavaScript
var heya = require('heya');

heya.create({
  controller: new heya.controllers.WebKeyboard(),
  driver: new heya.drivers.RemotePawelBot({
    url: 'http://1.2.3.4:8000'
  })
});
```

License
=======

The MIT License (MIT)

Copyright (c) 2015 Bryan Hughes bryan@theoreticalideations.com

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