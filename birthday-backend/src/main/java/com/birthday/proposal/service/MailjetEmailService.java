package com.birthday.proposal.service;

import com.birthday.proposal.config.MailjetProperties;
import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.resource.Emailv31;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * Sends transactional emails through Mailjet's Send API v3.1.
 *
 * Setup:
 *   1. Create a free account at https://www.mailjet.com
 *   2. Verify a sender email/domain (Account → Sender domains & addresses)
 *   3. Grab your API Key + Secret Key from Account → API Key Management
 *   4. Put them in application.properties (mailjet.api.key / mailjet.api.secret)
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MailjetEmailService {

    private final MailjetProperties props;

    /**
     * Fired the instant she discovers the hidden proposal.
     * This is the most important email this whole project sends.
     */
    public boolean sendProposalFoundAlert(String foundAtIso, String userAgent) {
        String subject = "💍 SHE FOUND THE PROPOSAL!";
        String textPart = "She just discovered the hidden proposal on your birthday website!\n\n"
                + "Found at: " + foundAtIso + "\n"
                + "Device: " + (userAgent != null ? userAgent : "unknown") + "\n\n"
                + "Go check in with her. 💖";

        String htmlPart = "<div style=\"font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px;"
                + "background:linear-gradient(135deg,#1a0530,#300510);border-radius:16px;color:#fff;text-align:center;\">"
                + "<div style=\"font-size:48px;margin-bottom:12px;\">💍</div>"
                + "<h1 style=\"color:#FF4D8D;font-size:28px;margin-bottom:8px;\">She Found It!</h1>"
                + "<p style=\"color:#FFD700;font-size:13px;letter-spacing:2px;margin-bottom:24px;\">THE PROPOSAL SECRET WAS UNLOCKED</p>"
                + "<p style=\"font-size:15px;line-height:1.8;color:#e8d5e0;\">"
                + "She just discovered the hidden proposal on your birthday website.<br/><br/>"
                + "<strong style=\"color:#A855F7;\">Found at:</strong> " + foundAtIso + "<br/>"
                + "<strong style=\"color:#A855F7;\">Device:</strong> " + (userAgent != null ? userAgent : "unknown")
                + "</p>"
                + "<p style=\"margin-top:24px;font-size:16px;color:#FF4D8D;\">Go check in with her. 💖</p>"
                + "</div>";

        return send(subject, textPart, htmlPart);
    }

    /**
     * Fired when she answers the proposal — "Yes ❤️" or "Need Some Time 😊".
     */
    public boolean sendProposalAnswerAlert(String answer, String atIso) {
        boolean isYes = "yes".equalsIgnoreCase(answer);
        String subject = isYes ? "❤️ SHE SAID YES!!!" : "😊 She tapped \"Need Some Time\"";
        String textPart = (isYes
                ? "SHE SAID YES! Congratulations!"
                : "She chose \"Need Some Time\" — give her space, she'll come around when she's ready.")
                + "\n\nAnswered at: " + atIso;

        String htmlPart = "<div style=\"font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px;"
                + "background:linear-gradient(135deg,#1a0530,#300510);border-radius:16px;color:#fff;text-align:center;\">"
                + "<div style=\"font-size:48px;margin-bottom:12px;\">" + (isYes ? "💍💖💍" : "😊") + "</div>"
                + "<h1 style=\"color:#FF4D8D;font-size:" + (isYes ? "32px" : "26px") + ";margin-bottom:8px;\">"
                + (isYes ? "SHE SAID YES!" : "She Needs Some Time")
                + "</h1>"
                + "<p style=\"font-size:15px;line-height:1.8;color:#e8d5e0;\">Answered at: " + atIso + "</p>"
                + "</div>";

        return send(subject, textPart, htmlPart);
    }

    private boolean send(String subject, String textPart, String htmlPart) {
        try {
            ClientOptions options = ClientOptions.builder()
                    .apiKey(props.getApi().getKey())
                    .apiSecretKey(props.getApi().getSecret())
                    .build();
            MailjetClient client = new MailjetClient(options);

            MailjetRequest request = new MailjetRequest(Emailv31.resource)
                    .property(Emailv31.MESSAGES, new JSONArray()
                            .put(new JSONObject()
                                    .put(Emailv31.Message.FROM, new JSONObject()
                                            .put("Email", props.getSender().getEmail())
                                            .put("Name", props.getSender().getName()))
                                    .put(Emailv31.Message.TO, new JSONArray()
                                            .put(new JSONObject()
                                                    .put("Email", props.getNotify().getEmail())
                                                    .put("Name", props.getNotify().getName())))
                                    .put(Emailv31.Message.SUBJECT, subject)
                                    .put(Emailv31.Message.TEXTPART, textPart)
                                    .put(Emailv31.Message.HTMLPART, htmlPart)));

            MailjetResponse response = client.post(request);
            log.info("Mailjet response status={} body={}", response.getStatus(), response.getData());
            return response.getStatus() == 200;
        } catch (Exception e) {
            log.error("Failed to send Mailjet email", e);
            return false;
        }
    }
}
