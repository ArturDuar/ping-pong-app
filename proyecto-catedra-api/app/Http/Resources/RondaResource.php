<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class RondaResource extends JsonResource
{
    /**
     * Transformar el recurso en un array para la respuesta JSON.
     * 
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'serie_id' => $this->serie_id,
            'nombre' => $this->name,
            'fecha_inicio' => $this->start_date,
            'fecha_fin' => $this->end_date,
        ];
    }
}
