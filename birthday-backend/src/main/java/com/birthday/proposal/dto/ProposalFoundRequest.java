package com.birthday.proposal.dto;

import lombok.Data;

@Data
public class ProposalFoundRequest {
    private String event;       // "proposal_unlocked"
    private String at;          // ISO timestamp from the browser
    private String userAgent;   // helps you know if it was opened on her phone or laptop
}
