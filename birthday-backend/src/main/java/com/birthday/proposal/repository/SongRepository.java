package com.birthday.proposal.repository;

import com.birthday.proposal.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<Song> findAllByOrderBySortOrderAsc();
}
