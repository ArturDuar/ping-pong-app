<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminRegistro extends Model
{
    protected $table = 'admin_registro';
    protected $fillable = ['AdminID', 'TorneoID', 'FechaHora', 'Accion'];
    public $timestamps = false;
}
