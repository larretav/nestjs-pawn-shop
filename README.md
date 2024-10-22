<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar repositorio.
2. Ejecutar:
  ```
  pnpm i
  ```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```.
4. Cambiar las variables de entorno.

5. Levantar la base de datos
  ```
  docker compose -f docker-compose.dev.yml up -d
  ```
6. Levantar proyecto: ```pnpm start:dev```
7. Crear un usuario administrador (ver código para las credenciales)
  ```
  http://localhost:4003/api/seed/create-admin-user
  ```
8. Ejecutar Seed (con token de autorización)
  ```
  http://localhost:4003/api/seed
  ```