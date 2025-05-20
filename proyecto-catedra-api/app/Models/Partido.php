<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;

    protected $fillable = [
        'torneo_id',
        'jugador1_id',
        'jugador2_id',
        'ganador_id',
        'ronda',
    ];

    // Relación con el torneo
    public function torneo()
    {
        return $this->belongsTo(Torneo::class);
    }

    // Relación con el jugador 1
    public function jugador1()
    {
        return $this->belongsTo(Jugador::class, 'jugador1_id');
    }

    // Relación con el jugador 2
    public function jugador2()
    {
        return $this->belongsTo(Jugador::class, 'jugador2_id');
    }

    // Relación con el ganador
    public function ganador()
    {
        return $this->belongsTo(Jugador::class, 'ganador_id');
    }

    public function series()
    {
        return $this->hasMany(Serie::class);
    }


}
