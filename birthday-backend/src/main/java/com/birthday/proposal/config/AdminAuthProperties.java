package com.birthday.proposal.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "admin")
@Data
public class AdminAuthProperties {
    /** Shared-secret password protecting all /api/admin/** endpoints. */
    private String password = "AdminPass";
}
