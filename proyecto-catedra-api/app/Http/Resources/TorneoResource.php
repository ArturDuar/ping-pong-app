<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TorneoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'nombre_torneo' => $this->nombre_torneo,
            'descripcion' => $this->descripcion,
            'lugar_evento' => $this->lugar_evento,
            'fecha_inicio' => $this->fecha_inicio,
            'fecha_fin' => $this->fecha_fin,
            'categoria_genero' => $this->categoria_genero,
            'num_participantes' => $this->num_participantes,
            'jugadores' => JugadorResource::collection($this->jugadores),
            'estado' =>$this->estado->nombre_estado,
        ];
    }
}
