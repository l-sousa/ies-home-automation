
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
        type = "Luminosidade"
        client = paho.Client("sensor-Luminosidade")
        client.connect("localhost",port=1883,keepalive=60,bind_address="")
        client.loop_start()
        value = 70
        rand = 0
        while True:
            message = '{"user_id":'+user_id+',"type":"'+type+'","sensor_id":'+sensor_id+',"room":"'+room+'","timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(round(value,2))+'}'
            client.publish("sensorData",message)
            print(message)
            rand = random.random()
            if value != 0:
                if rand < 0.0005:
                    value = 0
                elif rand < 0.5005:
                    value += 0.05
                else:
                    value -= 0.05
            else:
                if rand < 0.05:
                    value = 70
            time.sleep(5)
    except KeyboardInterrupt:
         print("Finished")
