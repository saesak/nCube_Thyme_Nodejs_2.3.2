var request = require('request');

counter = 0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function demo() {
    while (true) {
        counter = counter + 1
        request
            .post(
                'http://127.0.0.1:50007/postdata',
                { json: { key: counter.toString() } },
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
        await sleep(2000);
    }
}

demo();