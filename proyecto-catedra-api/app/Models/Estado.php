<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Estado extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_estado'
    ];

    public function torneo(){
        return $this->hasMany(Torneo::class, 'id_estado');
    }
}
