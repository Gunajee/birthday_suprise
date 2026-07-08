package com.birthday.proposal.service;

import com.birthday.proposal.dto.SecretFoundRequest;
import com.birthday.proposal.model.SecretFound;
import com.birthday.proposal.repository.SecretFoundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SecretService {

    private final SecretFoundRepository repository;

    public SecretFound recordSecret(SecretFoundRequest req) {
        LocalDateTime foundAt;
        try {
            foundAt = LocalDateTime.parse(req.getAt().replace("Z", ""));
        } catch (Exception e) {
            foundAt = LocalDateTime.now();
        }
        SecretFound entity = SecretFound.builder()
                .secretName(req.getSecret())
                .foundAt(foundAt)
                .build();
        return repository.save(entity);
    }

    public List<SecretFound> getAllFound() {
        return repository.findAllByOrderByFoundAtDesc();
    }
}
