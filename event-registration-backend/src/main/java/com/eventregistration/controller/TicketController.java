package com.eventregistration.controller;

import com.eventregistration.dto.MessageResponse;
import com.eventregistration.dto.TicketBookingRequest;
import com.eventregistration.dto.TicketResponse;
import com.eventregistration.entity.Ticket;
import com.eventregistration.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/book")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> bookTicket(@Valid @RequestBody TicketBookingRequest request) {
        try {
            Ticket ticket = ticketService.bookTicket(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(ticket);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/{ticketId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> getTicket(@PathVariable Long ticketId) {
        try {
            TicketResponse ticket = ticketService.getTicketById(ticketId);
            return ResponseEntity.ok(ticket);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/my-tickets")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<TicketResponse>> getMyTickets() {
        List<TicketResponse> tickets = ticketService.getUserTickets();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        List<TicketResponse> tickets = ticketService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }
}
