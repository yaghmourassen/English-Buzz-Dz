# استخدم JDK 17 slim
FROM openjdk:17-slim

# أنشئ مجلد العمل
WORKDIR /app

# انسخ كل ملفات المشروع إلى الحاوية
COPY . .

# إعداد متغيرات البيئة لـ Firebase
# استبدل القيم بالمسار الصحيح للملف على Render أو اجعلها متغيرة على منصة Render
ENV FIREBASE_CREDENTIALS=firebase-service.json
ENV FIREBASE_BUCKET=files-8c16e.appspot.com

# ثبّت Maven وابنِ المشروع مع تجاوز الاختبارات
RUN apt-get update && apt-get install -y maven \
    && mvn clean package -DskipTests

# تعيين Jar الذي سيتم تشغيله
# استبدل 'backend-0.0.1-SNAPSHOT.jar' باسم Jar الناتج من مشروعك
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
