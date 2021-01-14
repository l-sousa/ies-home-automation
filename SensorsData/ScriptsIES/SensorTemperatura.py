
import time
import sys
import datetime
import json
import random
import paho.mqtt.client as paho
import datetime as dt

if __name__ == '__main__':
    try:
        sensor_id = sys.argv[1]
        user_id = sys.argv[2]
        room = sys.argv[3]
        type = "Temperatura"
        temperaturas = {0:8,1:7,2:7,3:7,4:7,5:7,6:7,7:6,8:6,9:7,10:8,11:9,12:12,13:14,14:14,15:15,16:15,17:14,18:14,19:15,20:10,21:10,22:9,23:10}
        client = paho.Client("sensor-Temperatura"+user_id)
        client.connect("localhost",port=1883,keepalive=60,bind_address="")
        client.loop_start()
        currentHour = dt.datetime.now().hour
        nextTemp = temperaturas[(dt.datetime.now().hour+1)%24]
        lastTemp = temperaturas[(dt.datetime.now().hour)%24]
        value = lastTemp
        rand = 0
        while True:
            message = '{"user_id":"'+user_id+'","type":"'+type+'","sensor_id":'+sensor_id+',"room":"'+room+'","timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(round(value,2))+'}'
            client.publish("sensorData",message)
            #print(message)
            rand = random.random()
            if currentHour != dt.datetime.now().hour:
                #value = temperaturas[dt.datetime.now().hour%24]
                lastTemp = nextTemp
                nextTemp = temperaturas[(dt.datetime.now().hour+1)%24]
                currentHour = dt.datetime.now().hour
            if lastTemp < nextTemp:
                if rand < 0.5:
                    value += (nextTemp-lastTemp)/360
                else:
                    value -= (nextTemp-lastTemp)/720
            else:
                if rand < 0.5:
                    value -= -(nextTemp-lastTemp)/360
                else:
                    value += -(nextTemp-lastTemp)/720
            time.sleep(5)
    except KeyboardInterrupt:
         print("Finished")
