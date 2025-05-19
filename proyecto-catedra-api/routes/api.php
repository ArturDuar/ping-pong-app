<?php

use App\Http\Controllers\API\V1\JugadorController;
use App\Http\Controllers\API\V1\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\TorneoController;
use App\Http\Controllers\API\V1\TorneoJugadorController;

Route::prefix('/v1')->group(function () {

    // Autenticación
    Route::controller(LoginController::class)->group(function () {
        Route::post('/register', 'register'); // Registro de usuario
        Route::post('/login', 'login'); // Inicio de sesión
        Route::post('/logout', 'logout'); // Cierre de sesión
        // Inicio de sesión   // Cierre de sesion
    });

    // Rutas protegidas con autenticación
    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/me', [LoginController::class, 'me']); // Obtener información del usuario autenticado
        // Rutas de Torneos
        Route::prefix('/torneo')->controller(TorneoController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los torneos del usuario autenticado
            Route::post('/', 'store');      // Crear un torneo
            Route::get('/{id}', 'show');    // Ver detalles de un torneo
            Route::put('/{id}', 'update');  // Actualizar torneo
            Route::delete('/{id}', 'destroy'); // Eliminar torneo
        });

        Route::post('/torneo/{id}/ingresar-jugadores', [TorneoJugadorController::class, 'store']);
        
        // Rutas de Jugadores
        Route::prefix('/jugador')->controller(JugadorController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los jugadores
            Route::post('/', 'store');      // Crear un jugador
            Route::get('/{id}', 'show');    // Ver detalles de un jugador
            Route::put('/{id}', 'update');  // Actualizar jugador
            Route::delete('/{id}', 'destroy'); // Eliminar jugador
        });
    });
});