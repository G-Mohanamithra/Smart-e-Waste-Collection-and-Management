package com.ewaste.controller;

import com.ewaste.dto.RequestSubmission;
import com.ewaste.entity.EwasteRequest;
import com.ewaste.service.RequestService;
import com.ewaste.service.FileService; // <<< NEW IMPORT
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // <<< NEW IMPORT
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    private final RequestService requestService;
    private final FileService fileService; // <<< INJECT FILE SERVICE

    public RequestController(RequestService requestService, FileService fileService) { // <<< CONSTRUCTOR UPDATED
        this.requestService = requestService;
        this.fileService = fileService;
    }

    // FIX: Update Submission Endpoint to handle both JSON data and file parts
    @PostMapping("/submit")
    public ResponseEntity<EwasteRequest> submitRequest(
            @RequestPart("data") @Valid RequestSubmission dto, // JSON data part
            @RequestPart(value = "image", required = false) MultipartFile image, // File part
            Principal principal) {

        String userEmail = "admin@ewaste.com";

        try {
            // 1. Handle file upload if present
            if (image != null && !image.isEmpty()) {
                String imagePath = fileService.saveFile(image);
                dto.setImagePaths(imagePath); // Update DTO with the file path
            }

            // 2. Submit request with the updated DTO
            EwasteRequest submittedRequest = requestService.submitRequest(userEmail, dto);
            return new ResponseEntity<>(submittedRequest, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<EwasteRequest>> getMyRequests(Principal principal) {
        String userEmail = "admin@ewaste.com";
        List<EwasteRequest> requests = requestService.getRequestsByUserEmail(userEmail);
        return ResponseEntity.ok(requests);
    }
}