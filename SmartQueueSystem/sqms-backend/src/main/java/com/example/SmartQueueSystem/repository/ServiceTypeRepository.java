package com.example.SmartQueueSystem.repository;

import com.example.SmartQueueSystem.model.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    List<ServiceType> findByOrganizationId(Long organizationId);
}

