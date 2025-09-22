package com.example.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data

public class Information {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long informationId;

    @Column(length = 2000)
    private String informationTitle;
    private String informationContent;
    private LocalDate startDay;
    private LocalDate endDay;


}


