<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerieResource;
use App\Models\Partido;
use App\Models\Serie;
use App\Models\Torneo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SerieController extends Controller
{
    // Obtener series de un partido
    public function index($partidoId)
    {
        $partido = Partido::with('series')->findOrFail($partidoId);
        return SerieResource::collection($partido->series);
    }

    // Crear nueva serie para un partido
    public function syncSeries(Request $request, $partidoId)
    {
        $partido = Partido::with('series', 'torneo')->findOrFail($partidoId);

        $request->validate([
            'series' => 'required|array|min:1',
            'series.*.puntos_jugador1' => 'required|integer|min:0',
            'series.*.puntos_jugador2' => 'required|integer|min:0',
            'ganador_id' => 'nullable|integer|in:' . $partido->jugador1_id . ',' . $partido->jugador2_id,
        ]);


        // Usa transacción por seguridad
        DB::transaction(function () use ($partido, $request) {
            // Elimina todas las series actuales
            $partido->series()->delete();

            // Crea las nuevas
            foreach ($request->series as $serieData) {
                $partido->series()->create($serieData);
            }

            // Actualiza el ganador del partido
            $partido->ganador_id = $request->ganador_id;
            $partido->save();
        });

        $this->chequearGenerarSiguienteRonda($partido->torneo_id);

        return response()->json([
            'message' => 'Series actualizadas correctamente',
            'status' => 200
        ]);
    }


    private function chequearGenerarSiguienteRonda($torneoId)
    {
        $torneo = Torneo::findOrFail($torneoId);

        $ultimaRonda = Partido::where('torneo_id', $torneoId)->max('ronda');
        $partidosRonda = Partido::where('torneo_id', $torneoId)
            ->where('ronda', $ultimaRonda)
            ->get();

        if ($partidosRonda->contains(fn($p) => is_null($p->ganador_id))) {
            // Todavía hay partidos sin ganador, no hacer nada
            return;
        }

        $ganadores = $partidosRonda->pluck('ganador_id')->shuffle();

        if ($ganadores->count() === 1) {
            $torneo->update(['estado' => 3, 'ganador_id' => $ganadores->first()]);
            return;
        }

        if ($ganadores->count() % 2 != 0) {
            // No se puede crear siguiente ronda con número impar, posiblemente manejar error o notificar
            return;
        }

        $nuevaRonda = $ultimaRonda + 1;
        $nuevosPartidos = [];

        for ($i = 0; $i < $ganadores->count(); $i += 2) {
            $nuevosPartidos[] = [
                'torneo_id' => $torneo->id,
                'jugador1_id' => $ganadores[$i],
                'jugador2_id' => $ganadores[$i + 1],
                'ronda' => $nuevaRonda,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        DB::table('partidos')->insert($nuevosPartidos);
    }
}
