
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
        temperaturas = {0:10,1:9,2:9,3:9,4:9,5:9,6:9,7:8,8:8,9:9,10:10,11:11,12:13,13:14,14:14,15:15,16:15,17:14,18:14,19:15,20:10,21:10,22:9,23:10}
        client = paho.Client("sensor-Temperatura")
        client.connect("localhost",port=1883,keepalive=60,bind_address="")
        client.loop_start()
        currentHour = dt.datetime.now().hour
        nextTemp = temperaturas[(dt.datetime.now().hour+1)%24]
        lastTemp = temperaturas[(dt.datetime.now().hour)%24]
        value = lastTemp
        rand = 0
        while True:
            message = '{"user_id":'+user_id+',"type":"'+type+'","sensor_id":'+sensor_id+',"room":"'+room+'","timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(round(value,2))+'}'
            client.publish("sensorData",message)
            print(message)
            if currentHour != dt.datetime.now().hour:
                value = temperaturas[dt.datetime.now().hour%24]
                currentHour = dt.datetime.now().hour
            if lastTemp < nextTemp:
                value += (nextTemp-lastTemp)/720
            else:
                value -= -(nextTemp-lastTemp)/720
            time.sleep(5)
    except KeyboardInterrupt:
         print("Finished")
