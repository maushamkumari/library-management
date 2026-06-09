package com.library.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import org.springframework.stereotype.Repository;

@Repository
public class FirestoreRepository {
    private final Firestore firestore;
    private final ObjectMapper objectMapper;

    public FirestoreRepository(Firestore firestore, ObjectMapper objectMapper) {
        this.firestore = firestore;
        this.objectMapper = objectMapper;
    }

    public <T> T save(String collection, String id, T value) {
        try {
            Map<String, Object> payload = objectMapper.convertValue(value, new TypeReference<>() {});
            firestore.collection(collection).document(id).set(payload).get();
            return value;
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Firestore save interrupted", ex);
        } catch (ExecutionException ex) {
            throw new IllegalStateException("Firestore save failed", ex);
        }
    }

    public <T> Optional<T> findById(String collection, String id, Class<T> type) {
        try {
            DocumentSnapshot snapshot = firestore.collection(collection).document(id).get().get();
            return snapshot.exists() ? Optional.of(mapSnapshot(snapshot, type)) : Optional.empty();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Firestore read interrupted", ex);
        } catch (ExecutionException ex) {
            throw new IllegalStateException("Firestore read failed", ex);
        }
    }

    public <T> List<T> findAll(String collection, Class<T> type) {
        try {
            ApiFuture<QuerySnapshot> future = firestore.collection(collection).get();
            return future.get().getDocuments().stream()
                    .map(snapshot -> mapSnapshot(snapshot, type))
                    .toList();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Firestore list interrupted", ex);
        } catch (ExecutionException ex) {
            throw new IllegalStateException("Firestore list failed", ex);
        }
    }

    public <T> List<T> findByField(String collection, String field, Object value, Class<T> type) {
        try {
            CollectionReference ref = firestore.collection(collection);
            List<QueryDocumentSnapshot> documents = ref.whereEqualTo(field, value).get().get().getDocuments();
            return documents.stream().map(snapshot -> mapSnapshot(snapshot, type)).toList();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Firestore query interrupted", ex);
        } catch (ExecutionException ex) {
            throw new IllegalStateException("Firestore query failed", ex);
        }
    }

    public void delete(String collection, String id) {
        try {
            firestore.collection(collection).document(id).delete().get();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Firestore delete interrupted", ex);
        } catch (ExecutionException ex) {
            throw new IllegalStateException("Firestore delete failed", ex);
        }
    }

    private <T> T mapSnapshot(DocumentSnapshot snapshot, Class<T> type) {
        return objectMapper.convertValue(snapshot.getData(), type);
    }
}
