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
    @GetMapping("/sensors")
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    // Lists All Sensors of a certain Type (Temperature p.e.)
    @GetMapping("/sensors/type/{type}")
    public List<Sensor> getSensorsByType (@PathVariable String type) {
        return sensorRepository.findByType(type);
    }

    // Lists All Sensors of a certain Room of the house (Kitchen p.e.)
    @GetMapping("/sensors/room/{room}")
    public List<Sensor> getSensorsByRoom (@PathVariable String room) {
        return sensorRepository.findByRoom(room);
    }

    // Lists All Sensors Values
    @GetMapping("/values")
    public List<Values> getAllValues() {
        return valuesRepository.findAll();
    }

    // Lists all the Values of a certain Sensor
    @GetMapping("/values/{sensorId}")
    public List<Values> getSensorsByType (@PathVariable int sensorId) {
        return valuesRepository.findBySensorId(sensorId);
    }

    // Lists the last {num} Values of a certain Sensor
    @GetMapping("/values/{sensorId}/last/{num}")
    public List<Values> getSensorsByType (@PathVariable int sensorId, @PathVariable int num) {
        return valuesRepository.findAllBySensorIdOrderByTsDesc(sensorId, PageRequest.of(0, num));
    }

    // Lists the Values of a certain Sensor in the last {numHours} hours
    @GetMapping("/values/{sensorId}/period/{numHours}")
    public List<Values> getSensorsByTypeByTs (@PathVariable int sensorId, @PathVariable int numHours) {
        return valuesRepository.findAllBySensorIdAndTsGreaterThanOrderByTsDesc(sensorId,Timestamp.from(Instant.now().minusSeconds(numHours*60*60)));
    }

}
