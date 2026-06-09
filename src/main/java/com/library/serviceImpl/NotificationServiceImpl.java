package com.library.serviceImpl;

import com.library.model.Notification;
import com.library.repository.FirestoreRepository;
import com.library.service.NotificationService;
import com.library.util.IdGenerator;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final FirestoreRepository repository;

    public NotificationServiceImpl(FirestoreRepository repository) {
        this.repository = repository;
    }

    @Override
    public void create(String userId, String title, String message) {
        Notification notification = new Notification();
        notification.setNotificationId(IdGenerator.id("NTF"));
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        repository.save("notifications", notification.getNotificationId(), notification);
    }
}
