# Usamos la imagen oficial de OpenJDK para Java 17
FROM openjdk:17-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo JAR generado por Maven al contenedor
COPY target/virtual-master-chef-1.0-SNAPSHOT.jar /app/virtual-master-chef.jar

# Exponemos el puerto 8080 (puerto por defecto de Spring Boot)
EXPOSE 8080

# Comando para ejecutar la aplicación cuando el contenedor se levanta
ENTRYPOINT ["java", "-jar", "virtual-master-chef.jar"]
