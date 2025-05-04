// CounterController.java
package com.example.SmartQueueSystem.controller;

import com.example.SmartQueueSystem.model.Counter;
import com.example.SmartQueueSystem.service.CounterService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/counters")
public class CounterController {

    private final CounterService counterService;

    public CounterController(CounterService counterService) {
        this.counterService = counterService;
    }

    @GetMapping
    public List<Counter> getAll() {
        return counterService.getAll();
    }

    @PostMapping
    public Counter add(@RequestBody Counter counter) {
        return counterService.addCounter(counter);
    }
}
