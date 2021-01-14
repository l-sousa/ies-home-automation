package com.homemonitor.homemonitor.controller;

import java.sql.Timestamp;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.math.BigInteger;
import java.time.Instant;
import java.util.*;
import com.homemonitor.homemonitor.model.Sensor;
import com.homemonitor.homemonitor.model.Values;
import com.homemonitor.homemonitor.model.User;
import com.homemonitor.homemonitor.repository.SensorRepository;
import com.homemonitor.homemonitor.repository.ValuesRepository;
import com.homemonitor.homemonitor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private ValuesRepository valuesRepository;
    @Autowired
    private UserRepository userRepository;
    
    //Get token
    @PostMapping("login")
    public ResponseEntity<String> getToken(@RequestParam("Name") String nome,@RequestParam("Password") String password) throws NoSuchAlgorithmException {
    	MessageDigest m = MessageDigest.getInstance("MD5");
    	m.reset();
    	String concat = nome+password;
    	m.update(concat.getBytes());
    	byte[] digest = m.digest();
    	BigInteger number = new BigInteger(1,digest);
    	String token = number.toString(16);
    	System.out.println(token);
    	System.out.println(userRepository.findAllByToken(token));
        if (userRepository.findAllByToken(token).isEmpty()){
        	return new ResponseEntity<String>("",HttpStatus.LOCKED); 
        }else {
        	return new ResponseEntity<String>(token,HttpStatus.OK);
        }
    }

    @GetMapping("user/{userId}")
    public User getUserInfo(@PathVariable String userId) {
        System.out.println(userRepository.getNomeByToken(userId));
        User u1 = userRepository.getNomeByToken(userId);
        User u2 = new User(u1.getNome(), null, null);
        return u2;
    }
    
    // Lists All Sensors
    @GetMapping("user/{userId}/sensors")
    public List<Sensor> getAllSensorsByUserId(@PathVariable String userId) {
        return sensorRepository.findAllByUserId(userId);
    }

    // Lists All Sensors of a certain Type (Temperature p.e.)
    @GetMapping("user/{userId}/sensors/type/{type}")
    public List<Sensor> getAllSensorsByUserIdAndType (@PathVariable String userId, @PathVariable String type) {
        return sensorRepository.findAllByUserIdAndType(userId, type);
    }

    // Lists All Sensors of a certain Room of the house (Kitchen p.e.)
    @GetMapping("user/{userId}/sensors/room/{room}")
    public List<Sensor> getAllSensorsByUserIdAndRoom (@PathVariable String userId, @PathVariable String room) {
        return sensorRepository.findAllByUserIdAndRoom(userId, room);
    }

    // Lists All Sensors Values
    @GetMapping("user/{userId}/values")
    public List<Values> getAllValuesByUserId(@PathVariable String userId) {
        return valuesRepository.findAllByUserId(userId);
    }

    // Lists all the Values of a certain Sensor
    @GetMapping("user/{userId}/values/{sensorId}")
    public List<Values> getAllValuesByUserIdAndSensorId (@PathVariable String userId, @PathVariable int sensorId) {
        return valuesRepository.findAllByUserIdAndSensorId(userId, sensorId);
    }

    // Lists the last {num} Values of a certain Sensor
    @GetMapping("user/{userId}/values/{sensorId}/last/{num}")
    public List<Values> getAllValuesByUserIdAndSensorIdOrderByTsDesc (@PathVariable String userId, @PathVariable int sensorId, @PathVariable int num) {
        return valuesRepository.findAllByUserIdAndSensorIdOrderByTsDesc(userId, sensorId, PageRequest.of(0, num));
    }

    // Lists the Values of a certain Sensor in the last {numHours} hours
    @GetMapping("user/{userId}/values/{sensorId}/period/{numHours}")
    public List<Values> getAllValuesByUserIdAndSensorIdAndTsGreaterThanOrderByTsAsc (@PathVariable String userId, @PathVariable int sensorId, @PathVariable int numHours) {
        return valuesRepository.findAllByUserIdAndSensorIdAndTsGreaterThanOrderByTsAsc(userId,sensorId,Timestamp.from(Instant.now().minusSeconds(numHours*60*60)));
    }

}
