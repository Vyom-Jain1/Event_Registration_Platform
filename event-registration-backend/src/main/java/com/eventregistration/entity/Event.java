package com.eventregistration.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.eventregistration.util.FlexibleDateTimeDeserializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Event description is required")
    @Column(length = 1000)
    private String description;

    @NotNull(message = "Event date is required")
    @Column(nullable = false)
    @JsonDeserialize(using = FlexibleDateTimeDeserializer.class)
    private LocalDateTime date;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @Column(name = "available_seats")
    private Integer availableSeats;

    @Column(name = "ticket_price")
    private Double ticketPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
