package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "memory_gallery")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemoryGalleryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 16)
    private String year;

    @Column(nullable = false, length = 255)
    private String label;

    @Column(length = 500)
    private String note;

    @Column(length = 512)
    private String photoUrl;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
