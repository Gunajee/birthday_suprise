package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "kavithai")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Kavithai {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    /** Lines stored newline-separated; frontend splits on \n */

//    @Column(nullable = false, columnDefinition = "TEXT")
//    private String lines;
    @Lob
    @Column(name = "content", columnDefinition = "TEXT")
    private String lines;

    @Column(length = 1000)
    private String translation;

    @Column(nullable = false)
    @Builder.Default
    private Integer sortOrder = 0;
}
