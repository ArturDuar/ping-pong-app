<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class JugadorTorneoResource extends JsonResource
{
    /**
     * Transformar el recurso en un array para la respuesta JSON.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'jugador_id' => $this->jugador_id,
            'torneo_id' => $this->torneo_id,
            'puesto' => $this->position,
            'puntos' => $this->points,
        ];
    }
}
