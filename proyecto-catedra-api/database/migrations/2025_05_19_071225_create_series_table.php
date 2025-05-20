<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->foreignId('partido_id')->constrained()->onDelete('cascade');
            $table->integer('puntos_jugador1');
            $table->integer('puntos_jugador2');
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('series');
    }
};
