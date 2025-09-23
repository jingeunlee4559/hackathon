package com.example.backend.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@Service
public class ResponseCacheService {

    private final Map<String, CachedResponse> responseCache = new ConcurrentHashMap<>();
    private static final long CACHE_DURATION = 30 * 60 * 1000; // 30분
    private static final int MAX_CACHE_SIZE = 100;

    private static class CachedResponse {
        final String response;
        final long timestamp;

        CachedResponse(String response) {
            this.response = response;
            this.timestamp = System.currentTimeMillis();
        }

        boolean isExpired() {
            return System.currentTimeMillis() - timestamp > CACHE_DURATION;
        }
    }

    public String getCachedResponse(String query) {
        String normalizedQuery = normalizeQuery(query);
        CachedResponse cached = responseCache.get(normalizedQuery);

        if (cached != null && !cached.isExpired()) {
            return cached.response;
        }

        // 만료된 캐시 제거
        if (cached != null) {
            responseCache.remove(normalizedQuery);
        }

        return null;
    }

    public void cacheResponse(String query, String response) {
        // 캐시 크기 제한
        if (responseCache.size() >= MAX_CACHE_SIZE) {
            // 가장 오래된 항목 제거
            responseCache.entrySet().removeIf(entry -> entry.getValue().isExpired());

            // 여전히 크기가 크면 랜덤 제거
            if (responseCache.size() >= MAX_CACHE_SIZE) {
                String firstKey = responseCache.keySet().iterator().next();
                responseCache.remove(firstKey);
            }
        }

        String normalizedQuery = normalizeQuery(query);
        responseCache.put(normalizedQuery, new CachedResponse(response));
    }

    private String normalizeQuery(String query) {
        return query.toLowerCase()
            .replaceAll("[^가-힣a-z0-9\\s]", "") // 특수문자 제거
            .replaceAll("\\s+", " ") // 공백 정규화
            .trim();
    }

    public void clearCache() {
        responseCache.clear();
    }

    public int getCacheSize() {
        return responseCache.size();
    }
}