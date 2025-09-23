package com.example.backend.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Comment {
  private Integer commentId;
  private Integer communityId;
  private String content;
  private String commentsWriter;
  private LocalDateTime commentCreatedAt;
  private LocalDateTime commentUpdatedAt;
}
