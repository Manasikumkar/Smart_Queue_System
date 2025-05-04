// ServiceController.java
package com.example.SmartQueueSystem.controller;

import com.example.SmartQueueSystem.model.ServiceType;
import com.example.SmartQueueSystem.service.ServiceTypeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceTypeService service;

    public ServiceController(ServiceTypeService service) {
        this.service = service;
    }

    @GetMapping("/organization/{orgId}")
    public List<ServiceType> getByOrg(@PathVariable Long orgId) {
        return service.getAllByOrganization(orgId);
    }

    @PostMapping
    public ServiceType add(@RequestBody ServiceType serviceType) {
        return service.addService(serviceType);
    }
}
