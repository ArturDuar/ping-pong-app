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
        Schema::create('admin', function (Blueprint $table) {
            $table->id('AdminID');
            $table->string('NombreUsuario')->unique();
            $table->string('Correo')->unique();
            $table->string('PrimerNombre');
            $table->string('SegundoNombre')->nullable();
            $table->string('PrimerApellido');
            $table->string('SegundoApellido')->nullable();
            $table->string('Contrasena');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin');
    }
};
