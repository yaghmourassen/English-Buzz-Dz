package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Object login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return "Email introuvable";
        }

        User user = optionalUser.get();

        // ✅ تحقق إن كان الحساب مفعلاً
        if (!user.isActive()) {
            return "Votre compte n'est pas encore activé par l'administrateur.";
        }

        // ✅ تحقق من كلمة المرور
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Mot de passe incorrect";
        }

        return user;
    }

}
