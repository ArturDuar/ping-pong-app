<?php

use App\Http\Controllers\API\V1\AdminController;
use App\Http\Controllers\API\V1\AdminRegistroController;
use App\Http\Controllers\API\V1\EstadoController;
use App\Http\Controllers\API\V1\JugadorController;
use App\Http\Controllers\API\V1\JugadorPartidoController;
use App\Http\Controllers\API\V1\JugadorTorneoController;
use App\Http\Controllers\API\V1\LoginController;
use App\Http\Controllers\API\V1\PartidoController;
use App\Http\Controllers\API\V1\RondaController;
use App\Http\Controllers\API\V1\SerieController;
use App\Http\Controllers\API\V1\TorneoController;
use App\Http\Controllers\API\V1\UsuarioController;
use App\Http\Controllers\API\V1\ControllerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {

    // Autenticación
    Route::controller(LoginController::class)->group(function () {
        Route::post('/register', 'register'); // Registro de usuario
        Route::post('/login', 'login');       // Inicio de sesión
    });

    // Rutas protegidas con autenticación
    Route::middleware('auth:sanctum')->group(function () {

        // Cerrar sesión
        Route::post('/logout', [LoginController::class, 'logout']);

        // Rutas de Torneos
        Route::prefix('/torneo')->controller(TorneoController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los torneos del usuario autenticado
            Route::post('/', 'store');      // Crear un torneo
            Route::get('/{id}', 'show');    // Ver detalles de un torneo
            Route::put('/{id}', 'update');  // Actualizar torneo
            Route::delete('/{id}', 'destroy'); // Eliminar torneo
        });
        
        // Rutas de Jugadores
        Route::prefix('/jugador')->controller(JugadorController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los jugadores
            Route::post('/', 'store');      // Crear un jugador
            Route::get('/{id}', 'show');    // Ver detalles de un jugador
            Route::put('/{id}', 'update');  // Actualizar jugador
            Route::delete('/{id}', 'destroy'); // Eliminar jugador
        });

        // Rutas de Admin
        Route::prefix('/admin')->controller(AdminController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los admins
            Route::post('/', 'store');      // Crear un admin
            Route::get('/{id}', 'show');    // Ver detalles de un admin
            Route::put('/{id}', 'update');  // Actualizar admin
            Route::delete('/{id}', 'destroy'); // Eliminar admin
        });

        // Rutas de Registro de Admin
        Route::prefix('/registro-admin')->controller(AdminRegistroController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los registros de admin
            Route::post('/', 'store');      // Crear un registro de admin
            Route::get('/{id}', 'show');    // Ver detalles de un registro de admin
            Route::put('/{id}', 'update');  // Actualizar registro de admin
            Route::delete('/{id}', 'destroy'); // Eliminar registro de admin
        });

        // Rutas de Estado
        Route::prefix('/estado')->controller(EstadoController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los estados
            Route::post('/', 'store');      // Crear un estado
            Route::get('/{id}', 'show');    // Ver detalles de un estado
            Route::put('/{id}', 'update');  // Actualizar estado
            Route::delete('/{id}', 'destroy'); // Eliminar estado
        });

        // Rutas de Jugador-Partido
        Route::prefix('/jugador-partido')->controller(JugadorPartidoController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los registros de jugador-partido
            Route::post('/', 'store');      // Crear un registro de jugador-partido
            Route::get('/{id}', 'show');    // Ver detalles de un registro de jugador-partido
            Route::put('/{id}', 'update');  // Actualizar registro de jugador-partido
            Route::delete('/{id}', 'destroy'); // Eliminar registro de jugador-partido
        });

        // Rutas de Jugador-Torneo
        Route::prefix('/jugador-torneo')->controller(JugadorTorneoController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los registros de jugador-torneo
            Route::post('/', 'store');      // Crear un registro de jugador-torneo
            Route::get('/{id}', 'show');    // Ver detalles de un registro de jugador-torneo
            Route::put('/{id}', 'update');  // Actualizar registro de jugador-torneo
            Route::delete('/{id}', 'destroy'); // Eliminar registro de jugador-torneo
        });

        // Rutas de Partido
        Route::prefix('/partido')->controller(PartidoController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los partidos
            Route::post('/', 'store');      // Crear un partido
            Route::get('/{id}', 'show');    // Ver detalles de un partido
            Route::put('/{id}', 'update');  // Actualizar partido
            Route::delete('/{id}', 'destroy'); // Eliminar partido
        });

        // Rutas de Ronda
        Route::prefix('/ronda')->controller(RondaController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todas las rondas
            Route::post('/', 'store');      // Crear una ronda
            Route::get('/{id}', 'show');    // Ver detalles de una ronda
            Route::put('/{id}', 'update');  // Actualizar ronda
            Route::delete('/{id}', 'destroy'); // Eliminar ronda
        });

        // Rutas de Serie
        Route::prefix('/serie')->controller(SerieController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todas las series
            Route::post('/', 'store');      // Crear una serie
            Route::get('/{id}', 'show');    // Ver detalles de una serie
            Route::put('/{id}', 'update');  // Actualizar serie
            Route::delete('/{id}', 'destroy'); // Eliminar serie
        });

        // Rutas de Usuario
        Route::prefix('/usuario')->controller(UsuarioController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los usuarios
            Route::post('/', 'store');      // Crear un usuario
            Route::get('/{id}', 'show');    // Ver detalles de un usuario
            Route::put('/{id}', 'update');  // Actualizar usuario
            Route::delete('/{id}', 'destroy'); // Eliminar usuario
        });

        // Rutas para Controller (si corresponde)
        Route::prefix('/controller')->controller(ControllerController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos
            Route::post('/', 'store');      // Crear
            Route::get('/{id}', 'show');    // Ver detalles
            Route::put('/{id}', 'update');  // Actualizar
            Route::delete('/{id}', 'destroy'); // Eliminar
        });

    });
});

