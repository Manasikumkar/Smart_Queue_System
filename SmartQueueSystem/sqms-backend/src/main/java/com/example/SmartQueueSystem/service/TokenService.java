// TokenService.java
package com.example.SmartQueueSystem.service;

import com.example.SmartQueueSystem.model.Token;
import com.example.SmartQueueSystem.repository.TokenRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TokenService {
    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Token generateToken(Token token) {
        token.setCreatedAt(LocalDateTime.now());
        token.setStatus("Waiting");
        return tokenRepository.save(token);
    }

    public List<Token> getWaitingTokens(Long serviceTypeId) {
        return tokenRepository.findByServiceTypeIdAndStatus(serviceTypeId, "Waiting");
    }

    public Token updateStatus(Long id, String status) {
        Token token = tokenRepository.findById(id).orElseThrow();
        token.setStatus(status);
        return tokenRepository.save(token);
    }
}

