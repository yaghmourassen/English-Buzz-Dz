package com.example.backend.service;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private final Path uploadDir = Paths.get("uploads");

    public UserService() {
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la création du dossier de téléchargement", e);
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User registerUser(String userJson, MultipartFile image) {
        try {
            // ✅ 1. تحويل JSON إلى كائن User
            User user = objectMapper.readValue(userJson, User.class);

            // ✅ 2. تحقق من وجود البريد الإلكتروني مسبقًا
            if (userRepository.findByEmail((String) user.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email déjà utilisé");
            }

            // ✅ 3. تحقق من الحقول الأساسية
            if (user.getPassword() == null || user.getPassword().isBlank()) {
                throw new IllegalArgumentException("Mot de passe manquant");
            }

            // ✅ 4. تشفير كلمة المرور
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);

            // ✅ 5. حفظ الصورة
            if (image != null && !image.isEmpty()) {
                String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path targetPath = uploadDir.resolve(filename);
                Files.copy(image.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
                user.setImageUrl("/uploads/" + filename);
            } else {
                user.setImageUrl(null); // أو صورة افتراضية
            }

            // ✅ 6. ضبط التواريخ
            LocalDateTime now = LocalDateTime.now();
            user.setActive(false);

            user.setCreatedAt(now);
            user.setUpdatedAt(now);

            // ✅ 7. حفظ المستخدم
            return userRepository.save(user);

        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Format JSON invalide !");
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors du traitement de l'image", e);
        }
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }
    public User updateUser(String id, String userJson, MultipartFile image) {
        try {
            User newUserData = objectMapper.readValue(userJson, User.class);

            return userRepository.findById(id).map(existingUser -> {

                existingUser.setFirstName(newUserData.getFirstName());
                existingUser.setLastName(newUserData.getLastName());
                existingUser.setEmail(newUserData.getEmail());
                existingUser.setPhone(newUserData.getPhone());
                existingUser.setAddress(newUserData.getAddress());
                existingUser.setRole(newUserData.getRole());
                existingUser.setActive(newUserData.isActive());
                existingUser.setUpdatedAt(LocalDateTime.now());

                if (image != null && !image.isEmpty()) {
                    try {
                        String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                        Path targetPath = uploadDir.resolve(filename);
                        Files.copy(image.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
                        existingUser.setImageUrl("/uploads/" + filename);
                    } catch (IOException e) {
                        throw new RuntimeException("خطأ في رفع الصورة", e);
                    }
                }

                return userRepository.save(existingUser);
            }).orElseThrow(() -> new RuntimeException("User not found"));

        } catch (IOException e) {
            throw new RuntimeException("خطأ في تحليل بيانات المستخدم JSON", e);
        }
    }


}
