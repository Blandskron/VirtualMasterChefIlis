FROM openjdk:11-jre-slim
WORKDIR /app
COPY target/virtual-master-chef.jar /app/virtual-master-chef.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "virtual-master-chef.jar"]
