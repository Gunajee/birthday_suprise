package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "story_chapters")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoryChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 16)
    private String icon;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 255)
    private String subtitle;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(length = 512)
    private String photoUrl;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
