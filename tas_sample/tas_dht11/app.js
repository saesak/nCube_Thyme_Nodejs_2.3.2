var express = require('express');
var bodyParser = require('body-parser');
var net = require('net');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var dataString = ''

app.post("/postdata", (req, res) => {
    var dataString = '0000';
    console.log(dataString);

    const tasHandler = () => {
        var asClient = net.connect(3105)

        try {
            // send to thyme
            asClient.on('connect', () => {
                // data -> trash
                if (dataString.toString().substring(0, 4) !== 'ffff') {
                    // not working with parsed data ...
                    // var send = JSON.stringify(parseRadarData(data)).replace(/"([^"]+)":/g, '$1:');
                    // client.write(JSON.stringify(cin).replace(/\\"/g, "'") + '<EOF>');
    
                    var cin = { ctname: 'radar', con: dataString };
    
                    torf = asClient.write(JSON.stringify(cin) + '<EOF>');
                    console.log(torf);
                }
            });
        } catch (error) {
            console.error('3333 -> 3105 : ' + error);
            asClient.on('close', () => asClient.destroy());
        }
        
    };
    
    tasHandler();

    res.send("process complete")
});

app.get("/getdata", (req, res) => {
    var data = {
        data1 : "mee",
        data2 : "po"
    }

    res.status(200).json(data)
});




app.listen(3000);

