package com.eventregistration.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Event is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @NotBlank(message = "Attendee name is required")
    @Column(nullable = false)
    private String attendeeName;

    @NotBlank(message = "Attendee email is required")
    @Email
    @Column(nullable = false)
    private String attendeeEmail;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "number_of_tickets")
    private Integer numberOfTickets = 1;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "booking_status")
    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus = BookingStatus.CONFIRMED;

    @Column(name = "booking_date", updatable = false)
    private LocalDateTime bookingDate;

    @PrePersist
    protected void onCreate() {
        bookingDate = LocalDateTime.now();
    }

    public enum BookingStatus {
        CONFIRMED, CANCELLED, PENDING
    }
}
