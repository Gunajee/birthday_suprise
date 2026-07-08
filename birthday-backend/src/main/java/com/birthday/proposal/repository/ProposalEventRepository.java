package com.birthday.proposal.repository;

import com.birthday.proposal.model.ProposalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProposalEventRepository extends JpaRepository<ProposalEvent, Long> {
    Optional<ProposalEvent> findFirstByOrderByFoundAtDesc();
}
