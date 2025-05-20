<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Serie extends Model
{
    use HasFactory;

    protected $fillable = [
        'puntos_jugador1',
        'puntos_jugador2',
    ];


    public function partido()
    {
        return $this->belongsTo(Partido::class);
    }

}
