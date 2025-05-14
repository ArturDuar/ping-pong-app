<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jugador_torneo', function (Blueprint $table) {
            $table->foreignId('JugadorID')->constrained('jugadores');
            $table->foreignId('TorneoID')->constrained('torneos');
            $table->timestamp('FechaInscripcion');
            $table->primary(['JugadorID', 'TorneoID']); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugador_torneo');
    }
};
