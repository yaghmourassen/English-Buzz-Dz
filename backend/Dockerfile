# استخدم JDK 17 slim
FROM openjdk:17-slim

# أنشئ مجلد العمل
WORKDIR /app

# انسخ كل ملفات المشروع إلى الحاوية
COPY . .

# ثبّت Maven وابنِ المشروع مع تجاوز الاختبارات
RUN apt-get update && apt-get install -y maven \
    && mvn clean package -DskipTests \
    && apt-get clean

# لا تضع هنا FIREBASE_CREDENTIALS، ستضبطه على Render مباشرة كـ environment variable
# مثال على كيفية تمريره في Render dashboard:
# Key: FIREBASE_CREDENTIALS
# Value: {"type":"service_account","project_id":"files-8c16e", ... بقية JSON كامل ...}

# تعيين Jar الذي سيتم تشغيله
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
