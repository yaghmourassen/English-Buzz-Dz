# استخدم صورة OpenJDK 17
FROM openjdk:17-slim

# مجلد العمل داخل الحاوية
WORKDIR /app

# انسخ كل ملفات المشروع داخل الحاوية
COPY . .

# ثبّت Maven وابنِ المشروع
RUN apt-get update && apt-get install -y maven \
    && mvn clean package

# شغّل الـ JAR الناتج
CMD ["java","-jar","target/backend-0.0.1-SNAPSHOT.jar"]
