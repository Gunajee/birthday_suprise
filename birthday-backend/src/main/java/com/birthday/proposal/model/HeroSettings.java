package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Singleton row (id always = 1) holding the editable hero/header content:
 * her name, tagline, and main photo.
 */
@Entity
@Table(name = "hero_settings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HeroSettings {

    @Id
    private Long id; // always 1

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 500)
    private String tagline;

    @Column(length = 512)
    private String photoUrl;
}
