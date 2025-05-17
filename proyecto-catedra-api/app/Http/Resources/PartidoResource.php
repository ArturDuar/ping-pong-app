<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class PartidoResource extends JsonResource
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
            'ronda_id' => $this->ronda_id,
            'fecha' => $this->date,
            'jugador1_id' => $this->player1_id,
            'jugador2_id' => $this->player2_id,
            'resultado' => $this->result,
            'estado' => $this->state,
        ];
    }
}
