package com.eventregistration.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketBookingRequest {

    @NotNull(message = "Event ID is required")
    private Long eventId;

    @NotBlank(message = "Attendee name is required")
    private String attendeeName;

    @NotBlank(message = "Attendee email is required")
    @Email
    private String attendeeEmail;

    private String phoneNumber;

    private Integer numberOfTickets = 1;
}
