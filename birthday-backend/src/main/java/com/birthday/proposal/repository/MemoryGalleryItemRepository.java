package com.birthday.proposal.repository;

import com.birthday.proposal.model.MemoryGalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoryGalleryItemRepository extends JpaRepository<MemoryGalleryItem, Long> {
    List<MemoryGalleryItem> findAllByOrderBySortOrderAsc();
}
