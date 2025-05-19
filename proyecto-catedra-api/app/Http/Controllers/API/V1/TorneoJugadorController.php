<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Torneo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TorneoJugadorController extends Controller
{
    public function store(Request $request, $torneoId)
    {
        $torneo = Torneo::findOrFail($torneoId);

        $validator = Validator::make($request->all(), [
            'jugadores' => ['required', 'array'],
            'jugadores.*' => 'exists:jugadores,id' // <- corregido aquí
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $torneo->jugadores()->sync($request->jugadores);

        return response()->json([
            'message' => 'Jugadores asignados al torneo correctamente',
            'status' => 200
        ]);
    }

}
