<?php

use App\Http\Controllers\API\V1\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\TorneoController;

Route::prefix('/v1')->group(function(){
    //Rutas para autenticacion
    Route::post('/register', [LoginController::class, 'register']);

    Route::post('/login', [LoginController::class,'login']);

    //rutas que necesitan autenticacion
    Route::middleware('auth:sanctum')->group(function(){

        //ruta para cerrar sesion
        Route::post('/logout', [LoginController::class,'logout']);

        //Rutas para torneo
        Route::get('/torneo', [TorneoController::class, 'index']);

        Route::get('/torneo/{id}', function(){
            return 'Viendo usuario ';
        });

        Route::post('/torneo', [TorneoController::class,'store']);

        Route::put('/torneo/{id}', function(){
            return 'Actualizando usuario';
        });

        Route::delete('/user/{id}', function(){
            return 'Eliminando usuario';
        });

    });






    //Rutas para torneo
    Route::get('/torneo', [TorneoController::class, 'index']);

    Route::get('/torneo/{id}', function(){
        return 'Viendo usuario ';
    });

    Route::post('/torneo', [TorneoController::class,'store']);

    Route::put('/user/{id}', function(){
        return 'Actualizando usuario';
    });

    Route::delete('/user/{id}', function(){
        return 'Eliminando usuario';
    });
});