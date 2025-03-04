# Dragon Ball Microservice - Node.js & MongoDB

Este microservicio en **Node.js** con **Express.js** permite consultar información sobre personajes y planetas del universo **Dragon Ball**, consumiendo la API pública **Dragon Ball API**. Además, implementa persistencia en **MongoDB** para almacenar reportes de planetas y optimizar futuras consultas.


## Características
Se utilizó **arquitectura hexagonal** para la organización del código y la separación de responsabilidades dentro del proyecto.


## Decisión técnica
En el endpoint **`/api/characters`**, se implementó un filtrado para excluir los personajes que tengan una fecha en el campo **`deletedAt`**. Esto evita mostrar elementos eliminados lógicamente en la base de datos de la API de Dragon Ball.  


## Tecnologías utilizadas
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  

## Instalación
1. Clonar el repositorio: 

   ```bash
   git clone https://github.com/alecofre05/challenge-op.git
   ```
2. Acceder a la carpeta del proyecto:
   ```bash
   cd challenge-op
   ```
3. Configurar el archivo .env con las siguientes variables de entorno:
   ```bash
   PORT=3000 
   DB_NAME=dbchallenge 
   USER_DB=api 
   PASSWORD_DB=api1234 
   MONGO_INITDB_ROOT_USERNAME=admin 
   MONGO_INITDB_ROOT_PASSWORD=admin123 
   HOST_DB=mongodb PORT_DB=27017 
   DRAGONBALL_API_URL=https://dragonball-api.com/api
   ```
4. Levantar el proyecto con Docker:
   ```bash
   docker-compose up
   ```

## Test

Para ejecutar las pruebas, utilizar el siguiente comando en la consola:
```bash
npm test
```

## Inicialización de la Base de Datos en Docker

Se ha generado una carpeta que contiene el archivo `mongo-init.js`, el cual se encarga de inicializar la base de datos y crear las colecciones necesarias para el correcto funcionamiento de los endpoints.

### Funcionamiento:
- Al iniciar el contenedor de MongoDB con Docker, el script mongo-init.js se ejecuta automáticamente.
- Se crean la base de datos y la colección necesaria.
- Los endpoints pueden utilizar la base de datos sin necesidad de configuraciones manuales adicionales.

## Documentación de Endpoints

Para la documentación de los endpoints, se utilizó **Swagger**
### Acceso a la Documentación:
Para ver la documentación ingresar a la siguiente URL después de levantar el servidor:

🔗 [Swagger UI - Documentación de la API](http://localhost:3000/doc)
