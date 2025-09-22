package com.example.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data

public class Community {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long communityId;

    @Column(length = 2000)
    private String title;
    
    @Column(length = 2000)
    private String content;
    
    private String writer;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;

    @Column(columnDefinition= "int default 0")
    private Long viewCount;

}

