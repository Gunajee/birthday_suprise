package com.birthday.proposal.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Value("${app.cors.allowed-origins}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(allowedOrigins.split(","))
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        // ✅ FIX: explicitly list the custom header the admin
                        // panel sends with every request — without this, the
                        // preflight response doesn't include it in
                        // Access-Control-Allow-Headers and the browser blocks it.
                        .allowedHeaders(
                                "Content-Type",
                                "X-Admin-Password",
                                "Accept",
                                "Origin",
                                "Authorization"
                        )
                        .exposedHeaders("X-Admin-Password")
                        // maxAge tells the browser to cache the preflight result
                        // for 1 hour — cuts down on the number of OPTIONS round-trips.
                        .maxAge(3600);
            }
        };
    }
}
