package com.birthday.proposal.service;

import com.birthday.proposal.config.UploadProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Stores uploaded photos/audio/video on local disk under `upload.dir`
 * (see application.properties) and returns a public URL the frontend can
 * use directly in <img>/<audio>/<video> tags.
 *
 * For production, swap this out for S3/Cloudinary/etc — the rest of the
 * app only depends on getting back a URL string, so the storage backend
 * is fully swappable without touching any other code.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FileStorageService {

    private final UploadProperties props;

    public String store(MultipartFile file) {
        try {
            Path dir = Paths.get(props.getDir());
            Files.createDirectories(dir);

            String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "file" : file.getOriginalFilename());
            String ext = original.contains(".") ? original.substring(original.lastIndexOf('.')) : "";
            String filename = UUID.randomUUID() + ext;

            Path target = dir.resolve(filename);
            Files.copy(file.getInputStream(), target);

            String publicUrl = props.getPublicBaseUrl() + "/" + filename;
            log.info("Stored upload '{}' -> {}", original, publicUrl);
            return publicUrl;
        } catch (IOException e) {
            log.error("Failed to store uploaded file", e);
            throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
        }
    }
}
