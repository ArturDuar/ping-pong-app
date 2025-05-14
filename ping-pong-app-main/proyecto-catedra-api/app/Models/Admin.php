<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $primaryKey = 'AdminID';
    public $incrementing = false;
    protected $fillable = [
        'NombreUsuario',
        'Correo',
        'PrimerNombre',
        'SegundoNombre',
        'PrimerApellido',
        'SegundoApellido',
        'Contrasena',
    ];
    protected $hidden = [
        'Contrasena',
    ];
}