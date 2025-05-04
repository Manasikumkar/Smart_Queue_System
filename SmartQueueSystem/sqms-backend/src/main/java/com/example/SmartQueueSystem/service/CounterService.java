// CounterService.java
package com.example.SmartQueueSystem.service;

import com.example.SmartQueueSystem.model.Counter;
import com.example.SmartQueueSystem.repository.CounterRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CounterService {
    private final CounterRepository counterRepository;

    public CounterService(CounterRepository counterRepository) {
        this.counterRepository = counterRepository;
    }

    public List<Counter> getAll() {
        return counterRepository.findAll();
    }

    public Counter addCounter(Counter counter) {
        return counterRepository.save(counter);
    }
}

