<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('torneo_id')->constrained()->onDelete('cascade');
            $table->foreignId('jugador1_id')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('jugador2_id')->constrained('jugadores')->onDelete('cascade');
            $table->unsignedInteger('ronda')->default(1);
            $table->foreignId('ganador_id')->nullable()->constrained('jugadores')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partidos');
    }
};
