<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JugadorPartido extends Model
{
    protected $table = 'jugador_partido';
    protected $fillable = ['PartidoID', 'JugadorID', 'Puntaje'];
    public $timestamps = false;
}