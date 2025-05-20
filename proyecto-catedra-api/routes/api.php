<?php

use App\Http\Controllers\API\V1\EstadisticaJugadorController;
use App\Http\Controllers\API\V1\JugadorController;
use App\Http\Controllers\API\V1\LoginController;
use App\Http\Controllers\API\V1\PartidoController;
use App\Http\Controllers\API\V1\SerieController;
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

        Route::post('/torneo/{id}/ingresar-jugadores', [TorneoJugadorController::class, 'store']); //Ingresar jugadores a un torneo
        Route::post('/torneo/{id}/partidos', [PartidoController::class, 'generarPartidos']); //Generar partidos de un torneo
        Route::get('/torneo/{id}/partidos', [PartidoController::class, 'index']); //listar todos los partidos de un torneo
        Route::get('/torneo/partidos/{id}', [PartidoController::class, 'show']); //listar un partido
        Route::post('/torneo/{id}/partidos/siguiente-ronda', [PartidoController::class, 'generarSiguienteRonda']); //crear ronda siguiente.
        
        Route::prefix('/torneo/partidos')->controller(SerieController::class)->group(function () {
            Route::get('/{id}/series', 'index'); //listar todas las series de un partido
            Route::post('/{id}/series', 'syncSeries');  //modificar una serie de un partido
        });

        Route::prefix('/jugador')->controller(JugadorController::class)->group(function () {
            Route::get('/', 'index');       // Obtener todos los jugadores
            Route::post('/', 'store');      // Crear un jugador
            Route::get('/{id}', 'show');    // Ver detalles de un jugador
            Route::put('/{id}', 'update');  // Actualizar jugador
            Route::delete('/{id}', 'destroy'); // Eliminar jugador

        });

        Route::get('/estadisticas', [EstadisticaJugadorController::class, 'index']);
    });
});