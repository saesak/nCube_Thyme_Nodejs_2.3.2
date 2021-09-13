var request = require('request')
const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyACM0')


// Open errors will be emitted as an error event
port.on('error', function(err) {
    console.log('Error: ', err.message)
})

var newData = 0

// Switches the port into "flowing mode"
port.on('data', function (data) {
    console.log('Data:', data)
    newData = data
})

function send() {
    while(true) {
        request
            .post(
                'http://127.0.0.1:3000/postdata',
                {json : {key : newData.toString()}},
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                    }
                }
            )
            .on('response', function(response) {
                console.log(response.statusCode);
                console.log(response.headers['content-type']);
            });
    }
}

