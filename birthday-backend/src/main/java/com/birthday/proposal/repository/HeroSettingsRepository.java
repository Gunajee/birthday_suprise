package com.birthday.proposal.repository;

import com.birthday.proposal.model.HeroSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeroSettingsRepository extends JpaRepository<HeroSettings, Long> {
}
