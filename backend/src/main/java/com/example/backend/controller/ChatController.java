package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import com.example.backend.model.dto.ChatRequest;
import com.example.backend.model.dto.ChatResponse;
import com.example.backend.service.ChatService;

@RestController @RequestMapping("/api") @RequiredArgsConstructor
public class ChatController {
  private final ChatService chat;

  @PostMapping("/chat")
  public ChatResponse chat(@RequestBody ChatRequest req) {
    return new ChatResponse(chat.answer(req.question()));
  }
}
