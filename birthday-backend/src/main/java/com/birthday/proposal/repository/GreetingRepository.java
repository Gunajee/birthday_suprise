package com.birthday.proposal.repository;

import com.birthday.proposal.model.Greeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GreetingRepository extends JpaRepository<Greeting, Long> {
    List<Greeting> findAllByOrderBySortOrderAsc();
}
