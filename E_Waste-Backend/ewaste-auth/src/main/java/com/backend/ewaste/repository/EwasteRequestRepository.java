// src/main/java/com/ewaste/repository/EwasteRequestRepository.java

package com.ewaste.repository;

import com.ewaste.entity.EwasteRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EwasteRequestRepository extends JpaRepository<EwasteRequest, Long> {
    List<EwasteRequest> findByUserId(Long userId);
}