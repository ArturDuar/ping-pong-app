<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartidoResource extends JsonResource
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
            'torneo_id' => $this->torneo_id,
            'ronda' => $this->ronda,
            'jugador1' => [
                'id' => $this->jugador1->id,
                'nombre' => $this->jugador1->nombre_jugador,
                'fotografia' => $this->jugador2->enlace_fotografia,
            ],
            'jugador2' => [
                'id' => $this->jugador2->id,
                'nombre' => $this->jugador2->nombre_jugador,
                'fotografia' => $this->jugador2->enlace_fotografia,
            ],
            'ganador' => $this->ganador ? [
                'id' => $this->ganador->id,
                'nombre' => $this->ganador->nombre_jugador,
                'fotografia' => $this->ganador->enlace_fotografia,
            ] : null,
            'series' => SerieResource::collection($this->whenLoaded('series')),
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
