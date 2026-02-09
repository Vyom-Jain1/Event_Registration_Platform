package com.eventregistration.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FlexibleDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

    @Override
    public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String dateString = p.getText();

        if (dateString == null || dateString.trim().isEmpty()) {
            return null;
        }

        // Try parsing as full LocalDateTime first (with time)
        try {
            return LocalDateTime.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } catch (Exception e) {
            // If that fails, try parsing as LocalDate and set time to midnight
            try {
                LocalDate date = LocalDate.parse(dateString, DateTimeFormatter.ISO_LOCAL_DATE);
                return date.atStartOfDay();
            } catch (Exception ex) {
                throw new IOException("Unable to parse date: " + dateString +
                        ". Expected format: yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss", ex);
            }
        }
    }
}
