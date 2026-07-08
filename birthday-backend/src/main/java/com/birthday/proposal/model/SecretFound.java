package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Optional log of every one of the 30 hidden secrets she discovers,
 * so you can watch her progress in real time if you want to.
 */
@Entity
@Table(name = "secrets_found")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecretFound {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String secretName;

    @Column(nullable = false)
    private LocalDateTime foundAt;
}
