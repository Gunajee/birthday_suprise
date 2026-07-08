package com.birthday.proposal.repository;

import com.birthday.proposal.model.StoryChapter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryChapterRepository extends JpaRepository<StoryChapter, Long> {
    List<StoryChapter> findAllByOrderBySortOrderAsc();
}
