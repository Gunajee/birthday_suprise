package com.birthday.proposal.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Lightweight single-admin auth: every request to /api/admin/** must
 * include header  X-Admin-Password: <the password from application.properties>.
 *
 * This is intentionally simple (no JWT/sessions) since the whole backend
 * is meant for exactly one admin (you) managing a personal birthday site.
 * If you ever expose this publicly long-term, swap in Spring Security
 * with proper hashed credentials instead.
 */
@Component
@RequiredArgsConstructor
public class AdminAuthInterceptor implements HandlerInterceptor {

    private final AdminAuthProperties props;
    public static final String HEADER = "X-Admin-Password";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // ✅ FIX: Always allow OPTIONS (CORS preflight) through without auth.
        // The browser sends OPTIONS to check "is this server willing to accept
        // cross-origin requests with my custom header?" — it must get a 200 back
        // (with correct CORS headers from CorsConfig) before it sends the real request.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        }

        String provided = request.getHeader(HEADER);
        if (provided == null || !provided.equals(props.getPassword())) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Unauthorized\"}");
            return false;
        }
        return true;
    }
}
