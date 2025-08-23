package com.example.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.bucket}")
    private String firebaseBucket; // ex: "files-8c16e.appspot.com"

    @PostConstruct
    public void initialize() throws IOException {
        // Lire le Secret File directement depuis Render
        FileInputStream serviceAccount = new FileInputStream("/etc/secrets/firebase-service.json");

        // Créer la configuration Firebase
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket(firebaseBucket)
                .build();

        // Initialiser Firebase seulement si ce n'est pas déjà fait
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}
