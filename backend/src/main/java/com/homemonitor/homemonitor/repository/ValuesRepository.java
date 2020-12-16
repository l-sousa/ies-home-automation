package com.homemonitor.homemonitor.repository;

import com.homemonitor.homemonitor.model.Sensor;
import com.homemonitor.homemonitor.model.Values;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface ValuesRepository extends JpaRepository<Values, Long> {
    Optional<Values> findByValueId(Long valueId);
    List<Values> findBySensorId(int sensorId);
    List<Values> findAllBySensorIdOrderByTsDesc(int sensorId, Pageable pageable);
    List<Values> findAllBySensorIdAndTsGreaterThanOrderByTsAsc(int sensorId, Timestamp ts);
}
