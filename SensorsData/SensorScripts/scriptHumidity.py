import random
import time
import datetime
import paho.mqtt.client as paho

humidity = random.random()*55+1
client = paho.Client("Sensor-Humidade")
client.connect("localhost",port=1883,keepalive=60,bind_address="")
client.loop_start()
while True:
    message = '{"sensor":'+str(2)+',"timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(humidity)+'}'
    client.publish("sensor/Distancia",message)
    print("Message: ",message)
    time.sleep(5)
    humidity=random.random()*55+50
