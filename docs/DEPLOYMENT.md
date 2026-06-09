# Deployment Guide

## Build

```powershell
mvn clean package
```

## Environment

Required:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CREDENTIALS_PATH`

Optional first-run admin seed:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Run Jar

```powershell
java -jar target/library-management-system-1.0.0.jar
```

## Production Notes

- Store Firebase service account JSON outside the repository.
- Set HTTPS at the reverse proxy or platform layer.
- Rotate admin credentials after first login.
- Configure log retention for `logs/library-management.log`.
- Use Firestore security rules appropriate for server-side Admin SDK usage and restrict service account access.
