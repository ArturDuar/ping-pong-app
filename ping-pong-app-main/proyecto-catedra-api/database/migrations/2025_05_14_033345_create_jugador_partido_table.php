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
        Schema::create('jugador_partido', function (Blueprint $table) {
            $table->foreignId('JugadorID')->constrained('jugadores');
            $table->foreignId('PartidoID')->constrained('partidos');
            $table->boolean('Participa')->default(false);
            $table->boolean('Gana')->default(false);
            $table->primary(['JugadorID', 'PartidoID']); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugador_partido');
    }
};
