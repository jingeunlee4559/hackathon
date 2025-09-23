package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class LLMClient {
  private final String model;
  private final String apiKey;
  private final RestTemplate restTemplate;

  public LLMClient(@Value("${app.openai.model:gpt-4o-mini}") String model,
                   @Value("${app.openai.api-key:}") String apiKey) {
    this.model = model;
    this.apiKey = apiKey.isEmpty() ? System.getenv("OPENAI_API_KEY") : apiKey;
    this.restTemplate = new RestTemplate();
  }

  public String ask(String system, String user) {
    String url = "https://api.openai.com/v1/chat/completions";

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + apiKey);
    headers.set("Content-Type", "application/json");

    Map<String, Object> systemMessage = Map.of(
      "role", "system",
      "content", system
    );

    Map<String, Object> userMessage = Map.of(
      "role", "user",
      "content", user
    );

    Map<String, Object> requestBody = Map.of(
      "model", model,
      "messages", Arrays.asList(systemMessage, userMessage),
      "max_tokens", 1000
    );

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

    try {
      ResponseEntity<Map> response = restTemplate.exchange(
        url, HttpMethod.POST, entity, Map.class
      );

      Map<String, Object> responseBody = response.getBody();
      if (responseBody != null && responseBody.containsKey("choices")) {
        List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
        if (!choices.isEmpty()) {
          Map<String, Object> choice = choices.get(0);
          Map<String, Object> message = (Map<String, Object>) choice.get("message");
          return (String) message.get("content");
        }
      }
      return "";
    } catch (Exception e) {
      e.printStackTrace();
      return "오류가 발생했습니다: " + e.getMessage();
    }
  }
}
