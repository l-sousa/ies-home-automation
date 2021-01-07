import sys
import RPi.GPIO as GPIO
import time
import datetime
import json
import paho.mqtt.client as paho

GPIO.setmode(GPIO.BCM)

GPIO_TRIGGER = 18
GPIO_ECHO = 24

GPIO.setup(GPIO_TRIGGER,GPIO.OUT)
GPIO.setup(GPIO_ECHO,GPIO.IN)

def distance():
    GPIO.output(GPIO_TRIGGER,True)
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER,False)

    StartTime = time.time()
    StopTime = time.time()

    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()

    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()

    TimeElapsed = StopTime - StartTime

    distance = (TimeElapsed *34300) / 2

    return distance

if __name__ == '__main__':
    try:
        sensor_id = sys.argv[1]
        user_id = sys.argv[2]
        room = sys.argv[3]
        type = "Movimento"
        client = paho.Client("sensor-Dis")
        client.connect("localhost",port=1883,keepalive=60,bind_address="")
        client.loop_start()
        Original_Distance = distance()
        LastDistance = Original_Distance
        dist = Original_Distance
        ThreshHold = 1
        count = 1
        while True:
            print(dist)
            if abs(dist - Original_Distance) < ThreshHold or abs(dist - LastDistance) < ThreshHold:
                print("Movement? : ",False )
            else:
                print("Movement? : ",True)
                message = '{"user_id":'+user_id+',"type":"'+type+'","sensor_id":'+sensor_id+',"room":"'+room+'","timeStamp":"'+str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+'","value":'+str(round(1,2))+'}'
                client.publish("sensorData",message)
                LastDistance = dist
            time.sleep(1)
            dist = distance()
            count +=1
    except KeyboardInterrupt:
         print("Finished")
         GPIO.cleanup()
