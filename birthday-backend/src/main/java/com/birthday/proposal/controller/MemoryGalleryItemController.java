package com.birthday.proposal.controller;

import com.birthday.proposal.model.MemoryGalleryItem;
import com.birthday.proposal.repository.MemoryGalleryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemoryGalleryItemController {

    private final MemoryGalleryItemRepository repository;

    /** Public, unauthenticated — the birthday site reads content from here. */
    @GetMapping("/api/memory-gallery")
    public List<MemoryGalleryItem> getAllPublic() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    /** Admin-protected mirror of the same list (used by the admin panel). */
    @GetMapping("/api/admin/memory-gallery")
    public List<MemoryGalleryItem> getAllAdmin() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/api/admin/memory-gallery/{id}")
    public ResponseEntity<MemoryGalleryItem> getOne(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/admin/memory-gallery")
    public MemoryGalleryItem create(@RequestBody MemoryGalleryItem item) {
        item.setId(null); // ensure insert, not update
        return repository.save(item);
    }

    @PutMapping("/api/admin/memory-gallery/{id}")
    public ResponseEntity<MemoryGalleryItem> update(@PathVariable Long id, @RequestBody MemoryGalleryItem item) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        item.setId(id);
        return ResponseEntity.ok(repository.save(item));
    }

    @DeleteMapping("/api/admin/memory-gallery/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/admin/memory-gallery/reorder")
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
