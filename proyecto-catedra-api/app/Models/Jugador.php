<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{

    use HasFactory;

    protected $table = "jugadores";
    protected $fillable = [
        'nombre_jugador',
        'genero',
        'enlace_fotografia',
        'fecha_nacimiento',
        'nacionalidad',
        'id_usuario'
    ];

    function usuario(){
        return $this->belongsTo(User::class, 'id_usuario');
    }
}
