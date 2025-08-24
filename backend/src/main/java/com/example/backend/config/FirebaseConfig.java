package com.example.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.file}") // ex: "firebase-service.json"
    private String firebaseConfigPath;

    @Value("${firebase.bucket}") // ex: "files-8c16e.appspot.com"
    private String firebaseBucket;

    @PostConstruct
    public void initialize() throws IOException {
        InputStream serviceAccount;

        // تحقق أولًا إذا كان Secret File موجود على Render
        File secretFile = new File("/etc/secrets/firebase-service.json");
        if (secretFile.exists()) {
            serviceAccount = new FileInputStream(secretFile);
            System.out.println("Using Firebase Secret File from Render: " + secretFile.getAbsolutePath());
        } else {
            // خلاف ذلك، استخدم الملف المحلي من classpath
            serviceAccount = getClass().getClassLoader().getResourceAsStream(firebaseConfigPath);
            if (serviceAccount == null) {
                throw new IOException("Fichier Firebase non trouvé dans le classpath: " + firebaseConfigPath);
            }
            System.out.println("Using local Firebase file: " + firebaseConfigPath);
        }

        // إعداد Firebase
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket(firebaseBucket)
                .build();

        // التهيئة فقط إذا لم يكن FirebaseApp موجود مسبقًا
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}
