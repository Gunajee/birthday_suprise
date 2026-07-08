package com.birthday.proposal.controller;

import com.birthday.proposal.model.StoryChapter;
import com.birthday.proposal.repository.StoryChapterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StoryChapterController {

    private final StoryChapterRepository repository;

    /** Public, unauthenticated — the birthday site reads content from here. */
    @GetMapping("/api/story-chapters")
    public List<StoryChapter> getAllPublic() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    /** Admin-protected mirror of the same list (used by the admin panel). */
    @GetMapping("/api/admin/story-chapters")
    public List<StoryChapter> getAllAdmin() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/api/admin/story-chapters/{id}")
    public ResponseEntity<StoryChapter> getOne(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/admin/story-chapters")
    public StoryChapter create(@RequestBody StoryChapter item) {
        item.setId(null); // ensure insert, not update
        return repository.save(item);
    }

    @PutMapping("/api/admin/story-chapters/{id}")
    public ResponseEntity<StoryChapter> update(@PathVariable Long id, @RequestBody StoryChapter item) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        item.setId(id);
        return ResponseEntity.ok(repository.save(item));
    }

    @DeleteMapping("/api/admin/story-chapters/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/admin/story-chapters/reorder")
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
