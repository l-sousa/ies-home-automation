package com.homemonitor.homemonitor.controller;

import java.util.*;
import com.homemonitor.homemonitor.model.Sensor;
import com.homemonitor.homemonitor.model.Values;
import com.homemonitor.homemonitor.repository.SensorRepository;
import com.homemonitor.homemonitor.repository.ValuesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;
    @Autowired
    private ValuesRepository valuesRepository;

    @GetMapping("/values")
    public List<Values> getAllValues() {
        return valuesRepository.findAll();
    }

    @GetMapping("/sensors")
    public List<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }



}
