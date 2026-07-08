package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "videos")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(length = 16)
    private String emoji;

    @Column(nullable = false, length = 1000)
    private String url;

    @Column(length = 1000)
    private String thumbnailUrl;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
