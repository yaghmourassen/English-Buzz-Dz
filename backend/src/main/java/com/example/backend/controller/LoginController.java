package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // كافية بدون allowCredentials
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email et mot de passe requis");
        }

        Object result = loginService.login(email, password);

        if (result instanceof String) {
            return ResponseEntity.status(401).body(result); // رسالة خطأ
        }

        User user = (User) result;
        return ResponseEntity.ok(user); // ترجع بيانات المستخدم كمجسم JSON
    }
}
