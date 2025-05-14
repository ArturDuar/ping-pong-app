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
        Schema::create('admin_registro', function (Blueprint $table) {
            $table->foreignId('AdminID')->constrained('admin');
            $table->foreignId('JugadorID')->constrained('jugadores');
            $table->foreignId('TorneoID')->constrained('torneos');
            $table->timestamp('FechaRegistro');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_registro');
    }
};
