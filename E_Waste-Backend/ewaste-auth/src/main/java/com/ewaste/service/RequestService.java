// src/main/java/com/ewaste/service/RequestService.java

package com.ewaste.service;

import com.ewaste.dto.RequestSubmission;
import com.ewaste.entity.EwasteRequest;
import com.ewaste.entity.User;
import com.ewaste.repository.EwasteRequestRepository;
import com.ewaste.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.List;

@Service
public class RequestService {
    private final EwasteRequestRepository requestRepository;
    private final UserRepository userRepository;

    public RequestService(EwasteRequestRepository requestRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public EwasteRequest submitRequest(String userEmail, RequestSubmission dto) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        EwasteRequest request = new EwasteRequest();
        request.setUser(user);
        request.setDeviceType(dto.getDeviceType());
        request.setBrand(dto.getBrand());
        request.setModel(dto.getModel());

        // FIX 3: Call the new setter method
        request.setDeviceCondition(dto.getDeviceCondition());

        request.setQuantity(dto.getQuantity());
        request.setPickupAddress(dto.getPickupAddress());
        request.setRemarks(dto.getRemarks());
        request.setCreatedAt(Instant.now());
        request.setUpdatedAt(Instant.now());
        request.setStatus(EwasteRequest.RequestStatus.PENDING);

        return requestRepository.save(request);
    }

    public List<EwasteRequest> getRequestsByUserEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        return requestRepository.findByUserId(user.getId());
    }
}