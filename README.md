API

Architecture

Se utilizó arquitectura hexagonal para la organización del código y la separación de responsabilidades dentro del proyecto.

Technical decision

En el endpoint /api/characters, se implementó un filtrado para excluir los personajes que tengan una fecha en el campo deletedAt.Esto permite evitar mostrar elementos marcados como eliminados lógicamente en la base de datos. 

Start

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>

Acceder a la carpeta del proyecto:

cd <NOMBRE_DEL_PROYECTO>

Configurar el archivo .env con las siguientes variables de entorno:

PORT=3000
DB_NAME=dbchallenge
USER_DB=api
PASSWORD_DB=api1234
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin123
HOST_DB=mongodb
PORT_DB=27017
DRAGONBALL_API_URL=https://dragonball-api.com/api

Levantar el proyecto con Docker:

docker-compose up

Test

Para ejecutar las pruebas, utilizar el siguiente comando en la consola:

npm test

DB

Scripts

Se incluyen los scripts necesarios para la inicialización de la base de datos y la creación de las colecciones necesarias.

Docker

How to run

Para ejecutar el proyecto utilizando Docker, seguir los siguientes pasos:

Asegurarse de tener Docker y Docker Compose instalados.

Posicionarse en la carpeta del proyecto y ejecutar:

docker-compose up

Esto levantará la base de datos y la API dentro de contenedores configurados en el docker-compose.yml.
