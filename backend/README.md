# Backend Service — Spring Boot 3.x

Dịch vụ Backend chính cho hệ thống Ứng dụng AI hỗ trợ vận hành & giảng dạy gia sư tiếng Anh 1-1.

## Công nghệ sử dụng
- **Java 17**
- **Spring Boot 3.2.3**
- **Spring Data JPA**
- **PostgreSQL Driver**
- **Spring Boot Actuator**

## Khởi chạy ứng dụng
### 1. Khởi chạy độc lập (Local)
Đảm bảo đã có PostgreSQL chạy ở port 5432, sau đó chạy:
```bash
mvn spring-boot:run
```

### 2. Khởi chạy qua Docker
```bash
docker build -t tutor-backend .
docker run -p 8080:8080 tutor-backend
```

## Endpoints
- `GET /api/v1/health`: Kiểm tra sức khỏe của Backend Service.
- `GET /actuator/health`: Spring Actuator healthcheck.
