// ServiceTypeService.java
package com.example.SmartQueueSystem.service;

import com.example.SmartQueueSystem.model.ServiceType;
import com.example.SmartQueueSystem.repository.ServiceTypeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ServiceTypeService {
    private final ServiceTypeRepository repository;

    public ServiceTypeService(ServiceTypeRepository repository) {
        this.repository = repository;
    }

    public List<ServiceType> getAllByOrganization(Long orgId) {
        return repository.findByOrganizationId(orgId);
    }

    public ServiceType addService(ServiceType serviceType) {
        return repository.save(serviceType);
    }
}

