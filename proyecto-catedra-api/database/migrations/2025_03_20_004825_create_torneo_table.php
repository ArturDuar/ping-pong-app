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
        Schema::create('torneo', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('nombre_torneo');
            $table->text('descripcion');
            $table->string('lugar_evento');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('categoria_genero');

            $table->foreignId('id_usuario')->constrained('users');
            $table->foreignId('id_estado')->constrained('estado')->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('torneo');
    }
};
