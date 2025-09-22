package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
    name = "placeTag",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "ukPlaceTagPair",
            columnNames = {"mapId", "mapTagId"}
        )
    }
)
public class PlaceTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "placeTableId")
    private Long placeTableId;

    // FK: mapId -> Map.mapId
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "mapId",
        nullable = false,
        foreignKey = @ForeignKey(name = "fkPlaceTagMap")
    )
    private Map map;

    // FK: mapTagId -> MapTag.mapTagId
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "mapTagId",
        nullable = false,
        foreignKey = @ForeignKey(name = "fkPlaceTagMapTag")
    )
    private MapTag mapTag;

    public PlaceTag() {}
    public PlaceTag(Map map, MapTag mapTag) {
        this.map = map;
        this.mapTag = mapTag;
    }
}
