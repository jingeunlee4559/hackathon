package com.example.backend.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Community {
  private Integer communityId;
  private String title;
  private String content;
  private String writer;
  private Integer viewCount;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}