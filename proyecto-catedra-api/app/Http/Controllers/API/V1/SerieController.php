<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Serie;
use App\Http\Resources\SerieResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SerieController extends Controller
{
    // GET /api/series
    public function index()
    {
        return SerieResource::collection(
            Serie::with(['torneo'])->get()
        );
    }

    // POST /api/series
    public function store(Request $request)
    {
        $validated = $request->validate([
            'Nombre' => 'required|string|max:100',
            'TorneoID' => 'required|exists:torneos,id'
        ]);

        // Validar nombre único por torneo
        if (Serie::where('TorneoID', $validated['TorneoID'])
                ->where('Nombre', $validated['Nombre'])
                ->exists()) {
            return response()->json([
                'message' => 'Ya existe una serie con este nombre en el torneo'
            ], Response::HTTP_CONFLICT);
        }

        $serie = Serie::create($validated);

        return new SerieResource($serie);
    }

    // GET /api/series/{id}
    public function show(Serie $serie)
    {
        $serie->load(['torneo']);
        return new SerieResource($serie);
    }

    // PUT/PATCH /api/series/{id}
    public function update(Request $request, Serie $serie)
    {
        $validated = $request->validate([
            'Nombre' => 'sometimes|required|string|max:100',
            'TorneoID' => 'sometimes|required|exists:torneos,id'
        ]);

        // Validar nombre único al actualizar
        if ($request->has('Nombre') && $request->Nombre !== $serie->Nombre) {
            if (Serie::where('TorneoID', $request->input('TorneoID', $serie->TorneoID))
                    ->where('Nombre', $request->Nombre)
                    ->exists()) {
                return response()->json([
                    'message' => 'Ya existe una serie con este nombre en el torneo'
                ], Response::HTTP_CONFLICT);
            }
        }

        $serie->update($validated);

        return new SerieResource($serie);
    }

    // DELETE /api/series/{id}
    public function destroy(Serie $serie)
    {
        // Validar que no tenga relaciones dependientes
        if ($serie->partidos()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar una serie con partidos asociados'
            ], Response::HTTP_CONFLICT);
        }

        $serie->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}