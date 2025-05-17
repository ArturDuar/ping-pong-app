<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Partido;
use App\Http\Resources\PartidoResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PartidoController extends Controller
{
    // GET /api/partidos
    public function index()
    {
        return PartidoResource::collection(
            Partido::with(['jugador1', 'jugador2', 'ganador', 'ronda'])->get()
        );
    }

    // POST /api/partidos
    public function store(Request $request)
    {
        $validated = $request->validate([
            'RondaID' => 'required|exists:rondas,id',
            'Jugador1ID' => 'required|exists:usuarios,id',
            'Jugador2ID' => 'required|exists:usuarios,id|different:Jugador1ID',
            'Estado' => 'required|in:pendiente,en_juego,terminado'
        ]);

        $partido = Partido::create($validated);

        return new PartidoResource($partido);
    }

    // GET /api/partidos/{id}
    public function show(Partido $partido)
    {
        $partido->load(['jugador1', 'jugador2', 'ganador', 'ronda']);
        return new PartidoResource($partido);
    }

    // PUT/PATCH /api/partidos/{id}
    public function update(Request $request, Partido $partido)
    {
        $validated = $request->validate([
            'GanadorID' => 'nullable|exists:usuarios,id',
            'Estado' => 'sometimes|required|in:pendiente,en_juego,terminado'
        ]);

        if (isset($validated['GanadorID']) && 
            !in_array($validated['GanadorID'], [$partido->Jugador1ID, $partido->Jugador2ID])) {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'El ganador no pertenece al partido');
        }

        $partido->update($validated);

        return new PartidoResource($partido);
    }

    // DELETE /api/partidos/{id}
    public function destroy(Partido $partido)
    {
        $partido->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}