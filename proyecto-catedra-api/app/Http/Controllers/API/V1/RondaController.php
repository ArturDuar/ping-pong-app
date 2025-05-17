<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Ronda;
use App\Http\Resources\RondaResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RondaController extends Controller
{
    // GET /api/rondas
    public function index()
    {
        return RondaResource::collection(
            Ronda::with(['torneo', 'partidos'])->get()
        );
    }

    // POST /api/rondas
    public function store(Request $request)
    {
        $validated = $request->validate([
            'TorneoID' => 'required|exists:torneos,id',
            'Numero' => 'required|integer|min:1',
            'FechaInicio' => 'required|date|after_or_equal:today',
            'FechaFin' => 'required|date|after_or_equal:FechaInicio'
        ]);
        
        if (Ronda::where('TorneoID', $validated['TorneoID'])
                ->where('Numero', $validated['Numero'])
                ->exists()) {
            return response()->json([
                'message' => 'Este número de ronda ya existe para el torneo seleccionado'
            ], Response::HTTP_CONFLICT);
        }

        $ronda = Ronda::create($validated);

        return new RondaResource($ronda);
    }

    // GET /api/rondas/{id}
    public function show(Ronda $ronda)
    {
        $ronda->load(['torneo', 'partidos.jugador1', 'partidos.jugador2']);
        return new RondaResource($ronda);
    }

    // PUT/PATCH /api/rondas/{id}
    public function update(Request $request, Ronda $ronda)
    {
        $validated = $request->validate([
            'Numero' => 'sometimes|integer|min:1',
            'FechaInicio' => 'sometimes|date',
            'FechaFin' => 'sometimes|date|after_or_equal:FechaInicio'
        ]);

        // Validación exclusiva para TorneoID
        if ($request->has('TorneoID')) {
            return response()->json([
                'message' => 'No se puede modificar el torneo asociado'
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $ronda->update($validated);

        return new RondaResource($ronda);
    }

    // DELETE /api/rondas/{id}
    public function destroy(Ronda $ronda)
    {
        // Validar que la ronda no tenga partidos asociados
        if ($ronda->partidos()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar una ronda con partidos registrados'
            ], Response::HTTP_CONFLICT);
        }

        $ronda->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}