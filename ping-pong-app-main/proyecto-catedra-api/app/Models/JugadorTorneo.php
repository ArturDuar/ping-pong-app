<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JugadorTorneo extends Model
{
    protected $table = 'jugador_torneo';
    protected $fillable = ['JugadorID', 'TorneoID', 'PuntajeTotal'];
    public $timestamps = false;
}