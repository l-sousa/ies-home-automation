package com.homemonitor.homemonitor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.homemonitor.homemonitor.service.MessagingService;



@SpringBootApplication(scanBasePackages = "com.homemonitor.homemonitor")
public class HomemonitorApplication implements CommandLineRunner {

	@Autowired
	private MessagingService messagingService;

	@Autowired
	private ConfigurableApplicationContext context;

	public static void main(String[] args) {
		SpringApplication.run(HomemonitorApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		final String topic = "sensorData";
		messagingService.subscribe(topic);
	}

}


