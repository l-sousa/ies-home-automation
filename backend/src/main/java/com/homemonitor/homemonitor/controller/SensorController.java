package com.homemonitor.homemonitor.controller;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;
import com.homemonitor.homemonitor.model.Sensor;
import com.homemonitor.homemonitor.model.Values;
import com.homemonitor.homemonitor.repository.SensorRepository;
import com.homemonitor.homemonitor.repository.ValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private ValuesRepository valuesRepository;

    // Lists All Sensors
    @GetMapping("user/{userId}/sensors")
    public List<Sensor> getAllSensorsByUserId(@PathVariable int userId) {
        return sensorRepository.findAllByUserId(userId);
    }

    // Lists All Sensors of a certain Type (Temperature p.e.)
    @GetMapping("user/{userId}/sensors/type/{type}")
    public List<Sensor> getAllSensorsByUserIdAndType (@PathVariable int userId, @PathVariable String type) {
        return sensorRepository.findAllByUserIdAndType(userId, type);
    }

    // Lists All Sensors of a certain Room of the house (Kitchen p.e.)
    @GetMapping("user/{userId}/sensors/room/{room}")
    public List<Sensor> getAllSensorsByUserIdAndRoom (@PathVariable int userId, @PathVariable String room) {
        return sensorRepository.findAllByUserIdAndRoom(userId, room);
    }

    // Lists All Sensors Values
    @GetMapping("user/{userId}/values")
    public List<Values> getAllValuesByUserId(@PathVariable int userId) {
        return valuesRepository.findAllByUserId(userId);
    }

    // Lists all the Values of a certain Sensor
    @GetMapping("user/{userId}/values/{sensorId}")
    public List<Values> getAllValuesByUserIdAndSensorId (@PathVariable int userId, @PathVariable int sensorId) {
        return valuesRepository.findAllByUserIdAndSensorId(userId, sensorId);
    }

    // Lists the last {num} Values of a certain Sensor
    @GetMapping("user/{userId}/values/{sensorId}/last/{num}")
    public List<Values> getAllValuesByUserIdAndSensorIdOrderByTsDesc (@PathVariable int userId, @PathVariable int sensorId, @PathVariable int num) {
        return valuesRepository.findAllByUserIdAndSensorIdOrderByTsDesc(userId, sensorId, PageRequest.of(0, num));
    }

    // Lists the Values of a certain Sensor in the last {numHours} hours
    @GetMapping("user/{userId}/values/{sensorId}/period/{numHours}")
    public List<Values> getAllValuesByUserIdAndSensorIdAndTsGreaterThanOrderByTsAsc (@PathVariable int userId, @PathVariable int sensorId, @PathVariable int numHours) {
        return valuesRepository.findAllByUserIdAndSensorIdAndTsGreaterThanOrderByTsAsc(userId,sensorId,Timestamp.from(Instant.now().minusSeconds(numHours*60*60)));
    }

}
