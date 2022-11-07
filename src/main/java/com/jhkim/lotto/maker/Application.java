package com.jhkim.lotto.maker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.jhkim.lotto.maker")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
