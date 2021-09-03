import requests
import datetime
import board
import adafruit_dht
import json
import time 

dhtDevice = adafruit_dht.DHT11(board.D18)

'''get = requests.get('http://127.0.0.1:3000/getdata') #get request
data = get.json() #process into json data
print(data)'''

while(True): 

    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        time = datetime.datetime.now()

        dht_data = {
            "temperature_c" : temperature_c,
            "temperature_f" : temperature_f,
            "humidity" : humidity,
            "time" : time
        }

        json_data = json.dumps(dht_data, indent = 4)
        
        post = requests.post('http://127.0.0.1:3000/postdata', json = json_data)
        print(post.text)


    except RuntimeError as error:
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
    
    time.sleep(2.0)