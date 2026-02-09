package com.eventregistration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventRegistrationApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventRegistrationApplication.class, args);
        System.out.println("\n===========================================");
        System.out.println("Event Registration Backend is running!");
        System.out.println("Server: http://localhost:8081");
        System.out.println("API Base: http://localhost:8081/api");
        System.out.println("===========================================\n");
    }
}
