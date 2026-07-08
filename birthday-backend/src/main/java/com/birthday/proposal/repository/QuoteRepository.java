package com.birthday.proposal.repository;

import com.birthday.proposal.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findAllByOrderBySortOrderAsc();
}
