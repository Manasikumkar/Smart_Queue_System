package com.example.SmartQueueSystem.repository;

import com.example.SmartQueueSystem.model.Counter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CounterRepository extends JpaRepository<Counter, Long> {
}
