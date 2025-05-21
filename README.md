# Nombre del proyecto

Aplicacion de ping pong

<img src="./proyecto-catedra-frontend2/public/img/Capturas/Logo.png">


# Colaboradores


|     Nombres completos     |   Carnets   |
| ------------------------- | ----------- |
| Roberto Arturo Duarte Mejía | DM240115 |
| Eduardo Alfredo Ramirez Torres | RT240549 |
| Salvador Enrique Delgado Peñate | DP240093 |
| Oscar Daniel Soto Jovel | SJ241841 |
| Cristian Alexander Hernández Valiente | HV240081 |
| Oscar Vladimir Alarcón Mendoza | AM221856 |


# Grupo Teorico 

Desarrollo de Aplic. Web con Soft. Interpret. en el Servidor DSS404 G03T

# Proyecto de Catedra DSS404

[Enlace a tablero de Trello](https://trello.com/invite/b/67ce6f4e33493a6e66375935/ATTI42db62758f5176ec412da50022746d6bA87E8188/tablero-proyecto-de-catedra-dss)

[Enlace a figma](https://www.figma.com/design/yzLNNozxwdzOOodtyO7p4n/ProyectoCatedraDSSMockUps?node-id=0-1&t=9uwFhqwI2v0alzXE-1)

# Capturas de pantalla

## Login y Sign Up

| Login | Sign Up |
|-------|---------|
| <img src="./proyecto-catedra-frontend2/public/img/Capturas/Login.png" width="400"/> | <img src="./proyecto-catedra-frontend2/public/img/Capturas/SignUp.png" width="400"/> |

## Pagina Principal
  <img src="./proyecto-catedra-frontend2/public/img/Capturas/PaginaPrincipal.png" width="400"/>
  
## Ver perfil de administrador
<img src="./proyecto-catedra-frontend2/public/img/Capturas/VerPerfil.png" width="400"/>


## Ver torneos y ver jugadores

| Torneos | Jugadores |
|---------|-----------|
| <img src="./proyecto-catedra-frontend2/public/img/Capturas/VerTorneos.png" width="400"/> | <img src="./proyecto-catedra-frontend2/public/img/Capturas/VerJugadores.png" width="400"/> |

## Crear Torneos y Jugadores

| Torneos | Jugadores |
|---------|-----------|
| <img src="./proyecto-catedra-frontend2/public/img/Capturas/CrearTorneo.png" width="400"/> | <img src="./proyecto-catedra-frontend2/public/img/Capturas/CrearJugador.png" width="400"/> |

## Torneo individual y Jugador Individual

| Torneos | Jugadores |
|---------|-----------|
| <img src="./proyecto-catedra-frontend2/public/img/Capturas/VerTorneoIndividual.png" width="400"/> | <img src="./proyecto-catedra-frontend2/public/img/Capturas/VerJugadorIndividual.png" width="400"/> |

## Añadir jugadores al torneo

<img src="./proyecto-catedra-frontend2/public/img/Capturas/AgregarJugadores.png" width="400"/>

## Ver Estadisticas

<img src="./proyecto-catedra-frontend2/public/img/Capturas/Estadisticas.png" width="400"/>

# Instruciones para ejecutar el programa
# 🏓 Ping Pong App

Aplicación web para la gestión de torneos de ping pong, desarrollada con Laravel (backend), React.js y Vite.js (frontend), utilizando SQLite como base de datos y Docker para la gestión del entorno.

## 📦 Requisitos

* Docker
* Docker Compose

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/ArturDuar/ping-pong-app.git
cd ping-pong-app
```

### 2. Configurar el entorno de Laravel (backend)

```bash
cp proyecto-catedra-api/.env.example proyecto-catedra-api/.env
touch proyecto-catedra-api/database/database.sqlite
```

Edita el archivo `.env` en `proyecto-catedra-api` y ajusta las siguientes líneas:

```ini
DB_CONNECTION=sqlite
DB_DATABASE=/var/www/html/database/database.sqlite
```

### 3. Construir y levantar los contenedores

```bash
docker-compose up --build -d
```

### 4. Inicializar Laravel

```bash
docker-compose exec backend bash -c "php artisan key:generate && php artisan migrate"
```

### 5. Instalar dependencias y ejecutar el frontend

```bash
docker-compose exec frontend sh -c "npm install && npm run dev"
```

### 6. Acceder a la aplicación

* Frontend: http://localhost:3000
* API Laravel: http://localhost:8000

## 🔧 Comandos útiles

* **Detener todos los contenedores:**

```bash
docker-compose down
```

* **Ver logs en tiempo real:**

```bash
docker-compose logs -f
```

* **Acceder al shell del backend:**

```bash
docker-compose exec backend bash
```

* **Acceder al shell del frontend:**

```bash
docker-compose exec frontend sh
```

## 💻 Tecnologías utilizadas

* **Backend:** Laravel, PHP, SQLite
* **Frontend:** React.js, Vite.js, Bootstrap
* **Entorno:** Docker, Docker Compose
* **Control de versiones:** Git, GitHub
