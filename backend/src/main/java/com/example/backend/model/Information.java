package com.example.backend.model;
import java.time.LocalDate;
import lombok.Data;

@Data
public class Information {
  private Long informationId;
  private String informationTitle;
  private String informationContent;
  private LocalDate startDay;
  private LocalDate endDay;
  private String imageUrl;
  private String linkUrl;
}
