package com.birthday.proposal.controller;

import com.birthday.proposal.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/upload")
@RequiredArgsConstructor
public class UploadController {

    private final FileStorageService fileStorageService;

    /** Accepts any photo/audio/video file and returns its new public URL. */
    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Empty file"));
        }
        String url = fileStorageService.store(file);
        return ResponseEntity.ok(Map.of("url", url));
    }
}
