package com.birthday.proposal.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "upload")
@Data
public class UploadProperties {
    /** Absolute or relative path on disk where uploaded files are stored. */
    private String dir = "uploads";
    /** Public base URL clients use to fetch uploaded files back (served via WebConfig below). */
    private String publicBaseUrl = "http://localhost:8080/uploads";
}
