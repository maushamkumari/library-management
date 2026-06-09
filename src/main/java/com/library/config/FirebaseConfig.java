package com.library.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp(
            @Value("${firebase.project-id:}") String projectId,
            @Value("${firebase.credentials.path:}") String credentialsPath) throws IOException {
        if (!FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.getInstance();
        }

        GoogleCredentials credentials = StringUtils.hasText(credentialsPath)
                ? GoogleCredentials.fromStream(new FileInputStream(credentialsPath))
                : GoogleCredentials.getApplicationDefault();

        FirebaseOptions.Builder options = FirebaseOptions.builder().setCredentials(credentials);
        if (StringUtils.hasText(projectId)) {
            options.setProjectId(projectId);
        }
        return FirebaseApp.initializeApp(options.build());
    }

    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        return FirestoreClient.getFirestore(firebaseApp);
    }
}
