package com.homemonitor.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.homemonitor.homemonitor.model.Sensor;

import java.util.List;
import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor, Integer>{
    Optional<Sensor> findById(Integer id);
    List<Sensor> findByType(String type);
    List<Sensor> findByRoom(String room);
}
