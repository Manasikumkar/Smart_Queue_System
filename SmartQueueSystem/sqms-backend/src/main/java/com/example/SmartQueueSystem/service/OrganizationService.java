// OrganizationService.java
package com.example.SmartQueueSystem.service;

import com.example.SmartQueueSystem.model.Organization;
import com.example.SmartQueueSystem.repository.OrganizationRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrganizationService {
    private final OrganizationRepository organizationRepository;

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> getAllOrganizations() {
        return organizationRepository.findAll();
    }

    public Organization addOrganization(Organization organization) {
        return organizationRepository.save(organization);
    }
}