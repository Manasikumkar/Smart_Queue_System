package com.example.SmartQueueSystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tokenNumber;

    private String status; // Waiting, In_Progress, Completed

    @ManyToOne
    private com.example.SmartQueueSystem.model.ServiceType serviceType;

    private LocalDateTime createdAt;

    // === GETTERS AND SETTERS ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTokenNumber() {
        return tokenNumber;
    }

    public void setTokenNumber(String tokenNumber) {
        this.tokenNumber = tokenNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public com.example.SmartQueueSystem.model.ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(com.example.SmartQueueSystem.model.ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
