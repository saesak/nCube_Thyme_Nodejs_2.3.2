import requests
import datetime
import board
import adafruit_dht
import json
import time as t

dhtDevice = adafruit_dht.DHT11(board.D18)

'''get = requests.get('http://127.0.0.1:3000/getdata') #get request
data = get.json() #process into json data
print(data)'''

while(True): 

    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        #time = datetime.datetime.now()

        dht_data = {
            "temperature_c" : temperature_c,
            "temperature_f" : temperature_f,
            "humidity" : humidity#,
            #"time" : time
        }
        

        
        #json = dht_data changes Content-Type in header to be
        #application/json so that in the app.js file
        #app.use(express.json()); can process the json file
        #if this is changed, app.js will only receive empty brackets
        post = requests.post('http://127.0.0.1:3000/postdata', json = dht_data)
        print(dht_data)


    except RuntimeError as error:
        print(error.args[0])
        t.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
    
    t.sleep(2.0)