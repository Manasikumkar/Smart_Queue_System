// TokenController.java
package com.example.SmartQueueSystem.controller;

import com.example.SmartQueueSystem.model.Token;
import com.example.SmartQueueSystem.service.TokenService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tokens")
public class TokenController {

    private final TokenService tokenService;

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping
    public Token generate(@RequestBody Token token) {
        return tokenService.generateToken(token);
    }

    @GetMapping("/waiting/{serviceTypeId}")
    public List<Token> getWaiting(@PathVariable Long serviceTypeId) {
        return tokenService.getWaitingTokens(serviceTypeId);
    }

    @PutMapping("/{id}/status")
    public Token updateStatus(@PathVariable Long id, @RequestParam String status) {
        return tokenService.updateStatus(id, status);
    }
}

