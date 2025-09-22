package com.example.backend.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data

public class Map {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long mapId;

    @Column(length = 2000)
    private String adress;
    
    private String placeName;

}

