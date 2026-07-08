package com.birthday.proposal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Records the exact moment she found the hidden proposal,
 * plus her eventual answer ("yes" / "wait" / null if not yet answered).
 */
@Entity
@Table(name = "proposal_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProposalEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime foundAt;

    @Column(length = 512)
    private String userAgent;

    @Column(length = 16)
    private String answer; // "yes" | "wait" | null

    private LocalDateTime answeredAt;

    @Column(nullable = false)
    private boolean emailSent;
}
