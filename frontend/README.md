# React Frontend

This Vite React app is the separated frontend for the Library Management System.

## Run

From the project root:

```powershell
npm install --prefix frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies API calls to the Spring Boot backend on `http://localhost:8080`.

## Backend

Start the backend separately:

```powershell
mvn spring-boot:run
```

Install Maven first if `mvn` is not recognized.
