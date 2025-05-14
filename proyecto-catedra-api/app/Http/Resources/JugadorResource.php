<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JugadorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre_jugador' => $this->nombre_jugador,
            'enlace_fotografia' => $this->enlace_fotografia,
            'genero' => $this->genero,
            'fecha_nacimiento' => $this->fecha_nacimiento,
            'edad' => Carbon::parse($this->fecha_nacimiento)->age,
            'nacionalidad' => $this->nacionalidad,
        ];
    }

    
}
