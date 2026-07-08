package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "songs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String film;

    @Column(length = 255)
    private String artist;

    @Column(length = 16)
    private String emoji;

    @Column(nullable = false, length = 1000)
    private String url;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
