package com.eventregistration.config;

import com.eventregistration.entity.User;
import com.eventregistration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userRepository.existsByEmail("admin@demo.com")) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@demo.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
            System.out.println("✅ Default admin user created: admin@demo.com / admin123");
        } else {
            System.out.println("ℹ️ Admin user already exists: admin@demo.com");
        }

        // Display all users count for debugging
        long userCount = userRepository.count();
        System.out.println("📊 Total users in database: " + userCount);
    }
}
