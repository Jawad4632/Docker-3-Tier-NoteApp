
# React Frontend Application

This is the React frontend application for the 3-Tier Application project.

## Getting Started

These instructions will help you run the React app locally or using Docker.

### Prerequisites

- Node.js (preferably version 16 or above)
- npm (comes with Node.js)
- Docker (optional, for containerized deployment)

## Running Locally

1. Clone the repository:

```
git clone <your-repo-url>

```
2. Change directory to the frontend folder:
```

cd frontend

```
3. Install dependencies:
```

npm install

```
4. Run the app in development mode:
```

npm run dev

```
5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The app supports hot module replacement, so changes you make will be reflected instantly in the browser.

## Dockerizing the React App

If you want to run the React app inside a Docker container, follow these steps:

1. Build the Docker image with your backend API URL as a build argument:
```

docker build --build-arg VITE_API_BASE_URL=http://localhost:8080/api -t my-vite-app .

```
2. Run the Docker container, exposing port 80:
```

docker run -p 80:80 my-vite-app

```
3. Access the app by opening [http://localhost](http://localhost) in your browser.

## Notes

- If you want to run the backend locally before starting the frontend, please refer to the backend README for instructions on setting up the Spring Boot server and database.
- Ensure your backend is running and accessible at the URL you provide in the Docker build argument or in your frontend environment variables.

---

Feel free to contribute or raise issues if you face any trouble running the app.
