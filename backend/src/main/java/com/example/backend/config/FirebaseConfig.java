package com.example.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.bucket}")
    private String firebaseBucket; // ex: "files-8c16e.appspot.com"

    @PostConstruct
    public void initialize() throws IOException {
        // قراءة متغير البيئة
        String firebaseCredentials = System.getenv("FIREBASE_CREDENTIALS");
        if (firebaseCredentials == null || firebaseCredentials.isEmpty()) {
            throw new RuntimeException("FIREBASE_CREDENTIALS environment variable not set");
        }

        // تحويل النص إلى InputStream
        ByteArrayInputStream serviceAccount = new ByteArrayInputStream(firebaseCredentials.getBytes(StandardCharsets.UTF_8));

        // إنشاء إعدادات Firebase
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket(firebaseBucket)
                .build();

        // تهيئة Firebase فقط إذا لم يتم تهيئته مسبقًا
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}
