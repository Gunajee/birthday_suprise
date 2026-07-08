package com.birthday.proposal.controller;

import com.birthday.proposal.model.Song;
import com.birthday.proposal.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SongController {

    private final SongRepository repository;

    /** Public, unauthenticated — the birthday site reads content from here. */
    @GetMapping("/api/songs")
    public List<Song> getAllPublic() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    /** Admin-protected mirror of the same list (used by the admin panel). */
    @GetMapping("/api/admin/songs")
    public List<Song> getAllAdmin() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/api/admin/songs/{id}")
    public ResponseEntity<Song> getOne(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/admin/songs")
    public Song create(@RequestBody Song item) {
        item.setId(null); // ensure insert, not update
        return repository.save(item);
    }

    @PutMapping("/api/admin/songs/{id}")
    public ResponseEntity<Song> update(@PathVariable Long id, @RequestBody Song item) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        item.setId(id);
        return ResponseEntity.ok(repository.save(item));
    }

    @DeleteMapping("/api/admin/songs/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/admin/songs/reorder")
    public ResponseEntity<?> reorder(@RequestBody List<Long> orderedIds) {
        for (int i = 0; i < orderedIds.size(); i++) {
            final int sortOrder = i;
            repository.findById(orderedIds.get(i)).ifPresent(item -> {
                item.setSortOrder(sortOrder);
                repository.save(item);
            });
        }
        return ResponseEntity.ok().build();
    }
}
