package com.homemonitor.homemonitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.homemonitor.homemonitor.model.Sensor;
import com.homemonitor.homemonitor.model.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findById(Integer id);
    List<User> findAllByToken(String token);
}
