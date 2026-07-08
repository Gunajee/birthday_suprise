package com.birthday.proposal.controller;

import com.birthday.proposal.model.HeroSettings;
import com.birthday.proposal.repository.HeroSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class HeroSettingsController {

    private static final Long SINGLETON_ID = 1L;
    private final HeroSettingsRepository repository;

    private HeroSettings getOrDefault() {
        return repository.findById(SINGLETON_ID).orElseGet(() -> HeroSettings.builder()
                .id(SINGLETON_ID)
                .name("My Dearest Angel")
                .tagline("Every moment with you becomes a beautiful memory.")
                .photoUrl(null)
                .build());
    }

    @GetMapping("/api/hero")
    public HeroSettings getPublic() {
        return getOrDefault();
    }

    @GetMapping("/api/admin/hero")
    public HeroSettings getAdmin() {
        return getOrDefault();
    }

    @PutMapping("/api/admin/hero")
    public HeroSettings update(@RequestBody HeroSettings updated) {
        updated.setId(SINGLETON_ID);
        return repository.save(updated);
    }
}
