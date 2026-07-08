package com.birthday.proposal.controller;

import com.birthday.proposal.model.Kavithai;
import com.birthday.proposal.repository.KavithaiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class KavithaiController {

    private final KavithaiRepository repository;

    /** Public, unauthenticated — the birthday site reads content from here. */
    @GetMapping("/api/kavithai")
    public List<Kavithai> getAllPublic() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    /** Admin-protected mirror of the same list (used by the admin panel). */
    @GetMapping("/api/admin/kavithai")
    public List<Kavithai> getAllAdmin() {
        return repository.findAllByOrderBySortOrderAsc();
    }

    @GetMapping("/api/admin/kavithai/{id}")
    public ResponseEntity<Kavithai> getOne(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/api/admin/kavithai")
    public Kavithai create(@RequestBody Kavithai item) {
        item.setId(null); // ensure insert, not update
        return repository.save(item);
    }

    @PutMapping("/api/admin/kavithai/{id}")
    public ResponseEntity<Kavithai> update(@PathVariable Long id, @RequestBody Kavithai item) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        item.setId(id);
        return ResponseEntity.ok(repository.save(item));
    }

    @DeleteMapping("/api/admin/kavithai/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/admin/kavithai/reorder")
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
