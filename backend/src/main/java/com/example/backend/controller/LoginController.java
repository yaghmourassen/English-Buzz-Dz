package com.example.backend.controller;

import com.example.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Object result = loginService.login(email, password);

        if (result instanceof Map && ((Map<?, ?>) result).containsKey("error")) {
            return ResponseEntity.status(401).body(result);
        }

        return ResponseEntity.ok(result);
    }
}
