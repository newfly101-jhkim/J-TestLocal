package io.aetherit.project.base;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "io.aetherit.project.base")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
