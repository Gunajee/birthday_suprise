package com.birthday.proposal.controller;

import com.birthday.proposal.dto.ProposalAnswerRequest;
import com.birthday.proposal.dto.ProposalFoundRequest;
import com.birthday.proposal.model.ProposalEvent;
import com.birthday.proposal.service.ProposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProposalController {

    private final ProposalService proposalService;

    /**
     * Hit the instant the frontend's heart-tap-hunt (or any other proposal trigger)
     * fires. Saves the event and sends YOU an immediate Mailjet email.
     */
    @PostMapping("/proposal-found")
    public ResponseEntity<?> proposalFound(@RequestBody ProposalFoundRequest req) {
        ProposalEvent saved = proposalService.recordProposalFound(req);
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "id", saved.getId(),
                "emailSent", saved.isEmailSent()
        ));
    }

    /**
     * Hit when she taps "Yes ❤️" or "Need Some Time 😊" on the proposal screen.
     */
    @PostMapping("/proposal-answer")
    public ResponseEntity<?> proposalAnswer(@RequestBody ProposalAnswerRequest req) {
        proposalService.recordAnswer(req);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}
