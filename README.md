# Colaboradores



- Roberto Arturo Duarte Mejía, DM240115
- Eduardo Alfredo Ramirez Torres, RT240549
- Salvador Enrique Delgado Peñate DP240093
- Oscar Daniel Soto Jovel SJ241841
- Cristian Alexander Hernández Valiente HV240081

# Proyecto de Catedra DSS404

[Enlace a tablero de Trello](https://trello.com/invite/b/67ce6f4e33493a6e66375935/ATTI42db62758f5176ec412da50022746d6bA87E8188/tablero-proyecto-de-catedra-dss)

[Enlace a figma](https://www.figma.com/design/yzLNNozxwdzOOodtyO7p4n/ProyectoCatedraDSSMockUps?node-id=0-1&t=9uwFhqwI2v0alzXE-1)


# Documentación de la API

Documentación de API (v1)

Base URL: /api/v1

Autenticación: La API utiliza Laravel Sanctum. Incluir token en header
Authorization: Bearer {tu-token}

Endpoints de Autenticación

Registro de Usuario
- Endpoint: POST /register
- Parámetros: name, email, password, password_confirmation
- Respuesta: Datos del usuario y token

Inicio de Sesión
- Endpoint: POST /login
- Parámetros: email, password
- Respuesta: Datos del usuario y token

Gestión de Torneos

 Listar Torneos
- Endpoint: GET /torneo
- Autenticación: Sí

Crear Torneo
- Endpoint: POST /torneo
- Parámetros: nombre, fecha_inicio, fecha_fin, ubicacion, descripcion
Ver Detalles de Torneo
- Endpoint: GET /torneo/{id}

Actualizar Torneo
- Endpoint: PUT /torneo/{id}
- Parámetros: nombre, fecha_inicio, fecha_fin, ubicacion, descripcion

Eliminar Torneo
- Endpoint: DELETE /torneo/{id}

Gestión de Jugadores

Listar Jugadores
- Endpoint: GET /jugador
- Autenticación: Sí

Crear Jugador
- Endpoint: POST /jugador
- Parámetros: nombre, apellido, fecha_nacimiento

Ver Detalles de Jugador
- Endpoint: GET /jugador/{id}

Actualizar Jugador
- Endpoint: PUT /jugador/{id}
- Parámetros: nombre, apellido, fecha_nacimiento

Eliminar Jugador
- Endpoint: DELETE /jugador/{id}
