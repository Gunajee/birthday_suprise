package com.birthday.proposal.controller;

import com.birthday.proposal.config.AdminAuthProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminAuthProperties props;

    public record LoginRequest(String password) {}

    /** Frontend calls this once at login to verify the password before storing it for subsequent requests. */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req.password() != null && req.password().equals(props.getPassword())) {
            return ResponseEntity.ok(Map.of("status", "ok"));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid password"));
    }
}
