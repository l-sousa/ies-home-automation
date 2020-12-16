package com.homemonitor.homemonitor.service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.annotation.PostConstruct;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
import org.json.JSONObject;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homemonitor.homemonitor.controller.SensorController;
import com.homemonitor.homemonitor.model.Values;
import com.homemonitor.homemonitor.repository.SensorRepository;
import com.homemonitor.homemonitor.repository.ValuesRepository;

@Service
public class MessagingService {

	@Autowired
	private IMqttClient mqttClient;
	
	@Autowired private SensorRepository sensorRepository;
	@Autowired private ValuesRepository valuesRepository;


	public void subscribe(final String topic) throws MqttException, InterruptedException {
		System.out.println("Setting up the subscribing of the topic: "+topic);

		mqttClient.subscribeWithResponse(topic, (tpic, msg) -> {
			//System.out.println("Sensor Data received");
			try {
				JSONObject jsonObject = new JSONObject(new String(msg.getPayload()));
				int sensorId = jsonObject.getInt("sensor");
				float value = jsonObject.getFloat("value");
				String timStamp= jsonObject.getString("timeStamp");
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
				Date parsedDate = dateFormat.parse(timStamp);
				Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());
				Values v = new Values((int)sensorId,(float)value,timestamp);
				valuesRepository.save(v);
			}catch(Exception e) {
				e.printStackTrace();
			}
			System.out.println(msg.getId() + " -> " + new String(msg.getPayload()));
		});
	}

}
