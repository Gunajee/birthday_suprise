package com.birthday.proposal.dto;

import lombok.Data;

@Data
public class ProposalAnswerRequest {
    private String answer; // "yes" | "wait"
    private String at;
}
