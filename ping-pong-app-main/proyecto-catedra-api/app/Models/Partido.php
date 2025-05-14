<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    protected $table = 'partido';
    protected $fillable = ['RondaID', 'Jugador1ID', 'Jugador2ID', 'GanadorID', 'Estado'];
     public $timestamps = false;
}