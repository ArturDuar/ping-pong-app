<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_torneo',
        'descripcion',
        'lugar_evento',
        'fecha_inicio',
        'fecha_fin',
        'categoria_genero',
        'num_participantes',
        'id_usuario',
        'id_estado',
        'id_ganador'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }

    public function estado()
    {
        return $this->belongsTo(Estado::class, 'id_estado');
    }

    public function jugadores()
    {
        return $this->belongsToMany(Jugador::class);
    }

    public function partidos(){
        return $this->hasMany(Partido::class);
    }

    public function ganador(){
        return $this->belongsTo(Jugador::class, 'id_ganador');
    }
}
