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
        $torneo = Torneo::with('partidos')->findOrFail($torneoId);

        if ($torneo->partidos->isNotEmpty()) {
            return response()->json([
                'error' => 'No se pueden añadir más jugadores. El torneo ya comenzó.'
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'jugadores' => ['array'],
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
