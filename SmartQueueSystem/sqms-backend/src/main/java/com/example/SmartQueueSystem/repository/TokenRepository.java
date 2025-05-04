package com.example.SmartQueueSystem.repository;

import com.example.SmartQueueSystem.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByServiceTypeIdAndStatus(Long serviceTypeId, String status);
}
