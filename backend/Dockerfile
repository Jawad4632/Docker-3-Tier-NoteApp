# -------- Stage 1: Build the app --------
FROM gradle:jdk17-alpine AS builder

WORKDIR /app

# Copy everything and build
COPY . .
RUN gradle clean bootJar --no-daemon -x test

# -------- Stage 2: Run the app --------
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the Spring Boot port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
