package com.ewaste.service;

import com.ewaste.entity.User;
import com.ewaste.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) { this.userRepository = userRepository; }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateProfile(String email, String name, String phone, String address, String profilePicture) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (name != null) user.setName(name);
        if (phone != null) user.setPhone(phone);
        if (address != null) user.setAddress(address);
        if (profilePicture != null) user.setProfilePicture(profilePicture);
        user.setUpdatedAt(java.time.Instant.now());
        return userRepository.save(user);
    }
}
