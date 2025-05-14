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
        Schema::create('series', function (Blueprint $table) {
            $table->id('SerieID');
            $table->foreignId('PartidoID')->constrained('partidos');
            $table->integer('NumSerie');
            $table->integer('Puntos');
            $table->string('Resultado')->nullable();
            $table->foreignId('JugadorID')->constrained('jugadores');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series');
    }
};
