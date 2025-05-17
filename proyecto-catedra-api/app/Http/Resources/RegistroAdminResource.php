<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class RegistroAdminResource extends JsonResource
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
            'admin_id' => $this->admin_id,
            'accion' => $this->action,
            'descripcion' => $this->description,
            'fecha_registro' => $this->created_at,
        ];
    }
}
