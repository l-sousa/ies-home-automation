package com.homemonitor.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.homemonitor.homemonitor.model.Sensor;

import java.util.List;
import java.util.Optional;

public interface SensorRepository extends JpaRepository<Sensor, Integer>{
    Optional<Sensor> findById(Integer id);
    List<Sensor> findAllByUserId(Integer userId);
    List<Sensor> findAllByUserIdAndType(Integer userId, String type);
    List<Sensor> findAllByUserIdAndRoom(Integer userId, String room);
    Optional<Sensor> findByUserIdAndId(Integer userId, Integer id);
    List<Sensor> findByType(String type);
    List<Sensor> findByRoom(String room);
}
