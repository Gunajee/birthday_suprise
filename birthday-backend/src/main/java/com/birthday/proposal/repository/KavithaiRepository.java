package com.birthday.proposal.repository;

import com.birthday.proposal.model.Kavithai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KavithaiRepository extends JpaRepository<Kavithai, Long> {
    List<Kavithai> findAllByOrderBySortOrderAsc();
}
