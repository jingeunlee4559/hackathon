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

public class Comment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long commentId;

    @Column(length = 2000)
    private String commentContent;
    private String commentWriter;
    private LocalDateTime commentCreatedAt;
    private LocalDateTime commentUpdatedAt;


}


