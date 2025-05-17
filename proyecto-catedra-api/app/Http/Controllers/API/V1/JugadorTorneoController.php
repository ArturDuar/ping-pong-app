<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\JugadorTorneoResource;
use App\Models\JugadorTorneo;
use App\Models\Torneo;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JugadorTorneoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Inscribir jugador en torneo
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TorneoID' => 'required|exists:torneos,id_torneo',
            'JugadorID' => 'required|exists:jugadores,id_jugador',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verificar si el jugador ya está inscrito
        if (JugadorTorneo::where('TorneoID', $request->TorneoID)
            ->where('JugadorID', $request->JugadorID)
            ->exists()) {
            return response()->json([
                'message' => 'El jugador ya está inscrito en este torneo'
            ], 409);
        }

        $inscripcion = JugadorTorneo::create([
            'TorneoID' => $request->TorneoID,
            'JugadorID' => $request->JugadorID,
            'PuntajeTotal' => 0 // Inicializar en 0
        ]);

        return new JugadorTorneoResource($inscripcion);
    }

    /**
     * Obtener estadísticas de jugador en torneo
     */
    public function show($torneoId, $jugadorId)
    {
        $jugadorTorneo = JugadorTorneo::with(['jugador', 'torneo'])
            ->where('TorneoID', $torneoId)
            ->where('JugadorID', $jugadorId)
            ->firstOrFail();

        return new JugadorTorneoResource($jugadorTorneo);
    }

    /**
     * Eliminar inscripción de jugador en torneo
     */
    public function destroy($torneoId, $jugadorId)
    {
        $inscripcion = JugadorTorneo::where('TorneoID', $torneoId)
            ->where('JugadorID', $jugadorId)
            ->firstOrFail();

        $inscripcion->delete();

        return response()->json(null, 204);
    }

    /**
     * Obtener clasificación del torneo
     */
    public function clasificacion($torneoId)
    {
        $clasificacion = JugadorTorneo::with('jugador')
            ->where('TorneoID', $torneoId)
            ->orderBy('PuntajeTotal', 'desc')
            ->get();

        return JugadorTorneoResource::collection($clasificacion);
    }

    /**
     * Actualizar puntajes de todos los jugadores en un torneo
     */
    public function actualizarPuntajes($torneoId)
    {
        $jugadoresTorneo = JugadorTorneo::where('TorneoID', $torneoId)->get();

        foreach ($jugadoresTorneo as $jt) {
            JugadorTorneo::actualizarPuntajeTotal($jt->JugadorID, $torneoId);
        }

        return response()->json([
            'message' => 'Puntajes actualizados correctamente'
        ]);
    }
}