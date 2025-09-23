package com.example.backend.model.dto;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder; import lombok.Data;

@Data @Builder
public class PolicyCardDto {
  private Long id;
  private String title;
  private String summary;
  private LocalDate startDay;
  private LocalDate endDay;
  private String imageUrl;
  private String linkUrl;
  private List<String> tags;
}
