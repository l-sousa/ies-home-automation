package com.homemonitor.homemonitor.repository;

import com.homemonitor.homemonitor.model.Values;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ValuesRepository extends JpaRepository<Values, Long> {
    Optional<Values> findByValueId(Long valueId);
}
