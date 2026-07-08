package com.birthday.proposal.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "mailjet")
@Data
public class MailjetProperties {

    private Api api = new Api();
    private Sender sender = new Sender();
    private Notify notify = new Notify();

    @Data
    public static class Api {
        private String key;
        private String secret;
    }

    @Data
    public static class Sender {
        private String email;
        private String name;
    }

    @Data
    public static class Notify {
        private String email; // YOUR email — receives the "she found it!" alert
        private String name;
    }
}
