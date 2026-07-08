package com.birthday.proposal.controller;

import com.birthday.proposal.dto.SecretFoundRequest;
import com.birthday.proposal.model.SecretFound;
import com.birthday.proposal.service.SecretService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SecretController {

    private final SecretService secretService;

    /** Optional: log each of the 30 hidden secrets as she finds them. */
    @PostMapping("/secret-found")
    public ResponseEntity<?> secretFound(@RequestBody SecretFoundRequest req) {
        secretService.recordSecret(req);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    /** View her progress — handy for a small admin page or just Postman. */
    @GetMapping("/secrets")
    public ResponseEntity<List<SecretFound>> allSecrets() {
        return ResponseEntity.ok(secretService.getAllFound());
    }
}
