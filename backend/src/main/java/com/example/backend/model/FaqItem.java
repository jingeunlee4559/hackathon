package com.example.backend.model;

import lombok.*;

@Data
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class FaqItem {
  private Long id;
  private String title;
  private String content;
  private String source;
  private String tags;      // "임신,출산,양육"
  private String createdAt; // yyyy-MM-dd HH:mm:ss (MyBatis에서 문자열 매핑)
}
