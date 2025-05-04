// OrganizationController.java
package com.example.SmartQueueSystem.controller;

import com.example.SmartQueueSystem.model.Organization;
import com.example.SmartQueueSystem.service.OrganizationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping
    public List<Organization> getAll() {
        return organizationService.getAllOrganizations();
    }

    @PostMapping
    public Organization add(@RequestBody Organization organization) {
        return organizationService.addOrganization(organization);
    }
}

