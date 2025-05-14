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
        Schema::create('partido', function (Blueprint $table) {
            $table->id('PartidoID');
            $table->timestamp('FechaCreacion');
            $table->timestamp('FechaFinalizacion')->nullable();
            $table->foreignId('RondaID')->constrained('rondas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partido');
    }
};
