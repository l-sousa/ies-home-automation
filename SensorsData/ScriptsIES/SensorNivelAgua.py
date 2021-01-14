
import time
import sys
import datetime
import json
import random
import paho.mqtt.client as paho

if __name__ == '__main__':
    try:
        sensor_id = sys.argv[1]
        user_id = sys.argv[2]
        room = sys.argv[3]
        type = "NivelAgua"
        client = paho.Client("sensor-NivelAgua"+user_id)
        client.connect("localhost",port=1883,keepalive=60,bind_address="")
        client.loop_start()
        message = '{"user_id":"'+user_id+'","type":"'+type+'","sensor_id":'+sensor_id+',"room":"'+room+'","timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(round(1,2))+'}'
        client.publish("sensorData",message)
        print(message)
        time.sleep(random.random()*5+15)
        message = '{"user_id":'+user_id+',"type":"'+type+'","sensor_id":'+sensor_id+',"room":"'+room+'","timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(round(0,2))+'}'
        client.publish("sensorData",message)
        print(message)
    except KeyboardInterrupt:
         print("Finished")
