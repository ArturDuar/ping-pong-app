<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
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
            'usuario_id' => $this->user_id,
            'token_acceso' => $this->access_token,
            'tipo_token' => $this->token_type,
            'expiracion' => $this->expires_in,
        ];
    }
}
