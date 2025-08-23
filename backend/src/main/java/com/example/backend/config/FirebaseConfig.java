package com.example.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.file}")
    private String firebaseConfigPath; // ex: /etc/secrets/firebase-service.json

    @Value("${firebase.bucket}")
    private String firebaseBucket; // ex: files-8c16e.appspot.com

    @PostConstruct
    public void initialize() throws IOException {
        // Lire le fichier JSON depuis le chemin absolu (Render Secrets)
        try (InputStream serviceAccount = new FileInputStream(firebaseConfigPath)) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket(firebaseBucket)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        }
    }
}
