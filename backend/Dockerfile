# Fase 1: Construcción del JAR usando Maven
FROM maven:3.8.4-openjdk-17 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos del proyecto al contenedor
COPY . .

# Ejecutamos Maven para empaquetar el proyecto y generar el JAR
RUN mvn clean package -DskipTests

# Fase 2: Usamos una imagen ligera de Java para ejecutar el JAR
FROM openjdk:17-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el JAR generado desde la fase de construcción
COPY --from=build /app/target/virtual-master-chef-1.0-SNAPSHOT.jar /app/virtual-master-chef.jar

# Exponemos el puerto 8080 (puerto por defecto de Spring Boot)
EXPOSE 8080

# Comando para ejecutar la aplicación cuando el contenedor se levanta
ENTRYPOINT ["java", "-jar", "virtual-master-chef.jar"]


# Local
# Usamos la imagen oficial de OpenJDK para Java 17
# FROM openjdk:17-slim

# Establecemos el directorio de trabajo dentro del contenedor
# WORKDIR /app

# Copiamos el archivo JAR generado por Maven al contenedor
# COPY target/virtual-master-chef-1.0-SNAPSHOT.jar /app/virtual-master-chef.jar

# Exponemos el puerto 8080 (puerto por defecto de Spring Boot)
# EXPOSE 8080

# Comando para ejecutar la aplicación cuando el contenedor se levanta
# ENTRYPOINT ["java", "-jar", "virtual-master-chef.jar"]
