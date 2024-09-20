# Virtual Master Chef 🍽️

Bienvenido a **Virtual Master Chef**, una plataforma culinaria interactiva donde los chefs y los visitantes pueden interactuar, crear y votar por sus recetas favoritas. Este proyecto está compuesto por un **Frontend** en **React**, un **Backend** en **Java Spring Boot** y una base de datos **PostgreSQL**. Todo el sistema está dockerizado para facilitar la configuración y despliegue.

- **Frontend en producción**: [https://virtualmasterchefilis.blandskron.com/](https://virtualmasterchefilis.blandskron.com/)
- **Backend en producción (Swagger UI)**: [https://virtualmasterchefilis.onrender.com/swagger-ui/index.html#/](https://virtualmasterchefilis.onrender.com/swagger-ui/index.html#/)
- **Base de datos en producción**: Desplegada también en **Render**.

![Frontend](./path-to-frontend-image.png) <!-- Imagen del frontend -->
![Backend](./path-to-backend-image.png) <!-- Imagen del backend -->

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Comandos Docker](#comandos-docker)
- [Endpoints API](#endpoints-api)
- [Postman y Swagger](#postman-y-swagger)
- [Despliegue en Producción](#despliegue-en-producción)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Descripción del Proyecto

Virtual Master Chef es una plataforma donde los chefs pueden crear y modificar recetas, y los visitantes pueden votar las mejores o peores recetas. Además, todos pueden visualizar recetas en la plataforma. La aplicación está completamente dockerizada para facilitar su despliegue y configuración en cualquier entorno.

**Frontend**: React \
**Backend**: Java Spring Boot \
**Base de Datos**: PostgreSQL

> Aquí puedes ver un video explicativo del proyecto: [Link al video](https://link-to-video.com)

---

## Tecnologías Usadas

- **Frontend**: React, Bootstrap para el diseño.
- **Backend**: Java Spring Boot.
- **Base de Datos**: PostgreSQL.
- **Contenedores**: Docker y Docker Compose para la gestión de contenedores.
- **Swagger**: Documentación de API interactiva.
- **Postman**: Herramienta para pruebas de API.
- **Editor de Código**: Visual Studio Code.

---

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos en tu máquina:

- **Docker** (y Docker Compose)
- **Git** 
- **Node.js** (para el frontend)
- **Java 17** (si decides correr el backend localmente fuera de Docker)
- **PostgreSQL** (si decides no usar Docker para la base de datos)

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Blandskron/VirtualMasterChefIlis.git
cd VirtualMasterChefIlis
```

### 2. Configurar el entorno

En el directorio raíz del proyecto, encontrarás un archivo `.env.example`. Renómbralo a `.env` y asegúrate de configurar las variables necesarias para la base de datos y el backend.

### 3. Construir y correr con Docker

Este proyecto usa **Docker Compose** para construir el frontend, backend y la base de datos en contenedores.

```bash
# Construir y correr los contenedores
docker-compose up --build
```

Esto levantará tres servicios:

- **Backend** (Java Spring Boot) en `http://localhost:8080`
- **Frontend** (React) en `http://localhost:3000`
- **Base de Datos** (PostgreSQL) en el puerto 5432

### 4. Verificar el estado de la aplicación

Abre tu navegador y accede a `http://localhost:3000` para ver el frontend. El backend con la API estará corriendo en `http://localhost:8080`. Puedes verificar la documentación de la API en `http://localhost:8080/swagger-ui.html`.

---

## Comandos Docker

Aquí algunos comandos útiles de Docker para gestionar los contenedores:

- **Iniciar los servicios**: `docker-compose up`
- **Detener los servicios**: `docker-compose down`
- **Reconstruir los servicios**: `docker-compose up --build`
- **Ver logs de un contenedor específico**: `docker-compose logs <service_name>`

---

## Endpoints API

A continuación se describen algunos de los principales endpoints del backend. La API está documentada usando **Swagger** y puedes acceder a la documentación en `http://localhost:8080/swagger-ui.html`.

### Autenticación

- **POST** `/api/auth/login`: Autenticar usuarios (Chefs y Visitantes).
- **POST** `/api/auth/register`: Registrar nuevos usuarios.

### Recetas

- **GET** `/api/recetas`: Obtener todas las recetas.
- **POST** `/api/recetas`: Crear una nueva receta (solo para chefs).
- **PUT** `/api/recetas/{id}`: Actualizar una receta (solo para chefs).
- **DELETE** `/api/recetas/{id}`: Eliminar una receta (solo para chefs).
- **POST** `/api/recetas/{id}/{voto}`: Votar una receta (visitante).

---

## Postman y Swagger

Para probar los endpoints de la API, puedes usar **Postman** o simplemente acceder a la interfaz de **Swagger** en tu navegador:

- Swagger (producción): [https://virtualmasterchefilis.onrender.com/swagger-ui/index.html#/](https://virtualmasterchefilis.onrender.com/swagger-ui/index.html#/)
- Postman: Crea una colección con los endpoints descritos y prueba las diferentes funcionalidades de la API.

---

## Despliegue en Producción

- **Frontend**: El frontend está desplegado en [https://virtualmasterchefilis.blandskron.com/](https://virtualmasterchefilis.blandskron.com/).
- **Backend**: El backend está desplegado en [Render](https://virtualmasterchefilis.onrender.com/swagger-ui/index.html#/), con la base de datos PostgreSQL también alojada en Render.
  
Estos despliegues usan Docker para una fácil portabilidad y manejo de entornos de desarrollo y producción.

---

## Contribuir

¡Contribuciones son bienvenidas! Si quieres mejorar esta plataforma, sigue estos pasos:

1. **Fork** el repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un **Pull Request**.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
