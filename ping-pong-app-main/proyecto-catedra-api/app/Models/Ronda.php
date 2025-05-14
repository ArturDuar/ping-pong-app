<?php
namespace App\Models;

use Illuminate\database\Eloquent\Model;

class Ronda extends Model
{
    protected $table = 'ronda';
    protected $fillable = ['TorneoID', 'Numero', 'FechaInicio', 'FechaFin'];
    public $timestamps = false;
}
