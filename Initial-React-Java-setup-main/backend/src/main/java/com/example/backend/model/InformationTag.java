package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(
    name = "informationTag",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "ukInformationTagPair",     
            columnNames = {"informationId", "tagId"}
        )
    }
)
public class InformationTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tableId")
    private Long tableId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "informationId",
        nullable = false,
        foreignKey = @ForeignKey(name = "fkInformationTagInformation") 
    )
    private Information information;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
        name = "tagId",
        nullable = false,
        foreignKey = @ForeignKey(name = "fkInformationTagTag") 
    )
    private Tag tag;

    public InformationTag() {}
    public InformationTag(Information information, Tag tag) {
        this.information = information;
        this.tag = tag;
    }
}
