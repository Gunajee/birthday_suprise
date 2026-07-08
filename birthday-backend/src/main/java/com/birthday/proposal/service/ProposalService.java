package com.birthday.proposal.service;

import com.birthday.proposal.dto.ProposalAnswerRequest;
import com.birthday.proposal.dto.ProposalFoundRequest;
import com.birthday.proposal.model.ProposalEvent;
import com.birthday.proposal.repository.ProposalEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProposalService {

    private final ProposalEventRepository repository;
    private final MailjetEmailService emailService;

    /**
     * Called the instant the frontend detects she found the proposal secret.
     * Persists the event AND fires the Mailjet email — both happen synchronously
     * but the email send failure never breaks the saved record (best-effort).
     */
    public ProposalEvent recordProposalFound(ProposalFoundRequest req) {
        LocalDateTime foundAt = parseOrNow(req.getAt());

        boolean emailSent = emailService.sendProposalFoundAlert(
                foundAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                req.getUserAgent()
        );

        ProposalEvent event = ProposalEvent.builder()
                .foundAt(foundAt)
                .userAgent(req.getUserAgent())
                .emailSent(emailSent)
                .build();

        ProposalEvent saved = repository.save(event);
        log.info("Proposal found event saved id={} emailSent={}", saved.getId(), emailSent);
        return saved;
    }

    /**
     * Called when she taps "Yes ❤️" or "Need Some Time 😊".
     * Updates the most recent proposal event with her answer and fires a follow-up email.
     */
    public Optional<ProposalEvent> recordAnswer(ProposalAnswerRequest req) {
        Optional<ProposalEvent> latest = repository.findFirstByOrderByFoundAtDesc();
        latest.ifPresent(event -> {
            event.setAnswer(req.getAnswer());
            event.setAnsweredAt(parseOrNow(req.getAt()));
            repository.save(event);
            emailService.sendProposalAnswerAlert(req.getAnswer(), event.getAnsweredAt().toString());
        });
        return latest;
    }

    private LocalDateTime parseOrNow(String iso) {
        try {
            return LocalDateTime.parse(iso.replace("Z", ""));
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }
}
