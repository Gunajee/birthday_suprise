package com.birthday.proposal.repository;

import com.birthday.proposal.model.SecretFound;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SecretFoundRepository extends JpaRepository<SecretFound, Long> {
    List<SecretFound> findAllByOrderByFoundAtDesc();
}
