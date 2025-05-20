<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PartidoResource;
use App\Models\Partido;
use App\Models\Torneo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartidoController extends Controller
{

    public function show($partidoId)
    {

        $partido = Partido::with(['series', 'jugador1', 'jugador2', 'ganador'])->findOrFail($partidoId);

        return new PartidoResource($partido);
    }

    public function generarPartidos(Request $request, $torneoId)
    {

        $torneo = Torneo::with(['jugadores', 'partidos'])->findOrFail($torneoId);

        // Validar si ya hay partidos generados
        if ($torneo->partidos->isNotEmpty()) {
            return response()->json([
                'error' => 'Ya se generaron los partidos para este torneo.'
            ], 400);
        }

        $jugadores = $torneo->jugadores->shuffle();

        if ($jugadores->count() % 2 != 0) {
            return response()->json(['error' => 'El número de jugadores debe ser par.'], 400);
        }

        $ronda = 1;
        $partidos = [];

        // Agrupar de 2 en 2
        for ($i = 0; $i < $jugadores->count(); $i += 2) {
            $partidos[] = [
                'torneo_id' => $torneo->id,
                'jugador1_id' => $jugadores[$i]->id,
                'jugador2_id' => $jugadores[$i + 1]->id,
                'ronda' => $ronda,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        // Guardar los partidos en la base de datos
        DB::table('partidos')->insert($partidos);
        $torneo->update(['id_estado' => 2]);

        $partidosGenerados = Partido::with(['jugador1', 'jugador2', 'ganador'])
            ->where('torneo_id', $torneoId)
            ->get();


        return response()->json([
            'message' => 'Partidos generados correctamente.',
            'data' => PartidoResource::collection($partidosGenerados)
        ]);

    }

    public function generarSiguienteRonda($torneoId)
    {
        $torneo = Torneo::findOrFail($torneoId);

        // Obtener la última ronda jugada
        $ultimaRonda = Partido::where('torneo_id', $torneoId)->max('ronda');

        // Obtener los partidos de la última ronda
        $partidosRonda = Partido::where('torneo_id', $torneoId)
            ->where('ronda', $ultimaRonda)
            ->get();

        // Verificar si todos los partidos tienen ganador
        if ($partidosRonda->contains(fn($p) => is_null($p->ganador_id))) {
            return response()->json(['error' => 'Aún hay partidos sin ganador en la ronda actual.'], 400);
        }

        // Obtener ganadores
        $ganadores = $partidosRonda->pluck('ganador_id')->shuffle();

        // Si ya hay un solo ganador, el torneo ha terminado
        if ($ganadores->count() === 1) {
            $torneo->update(['estado' => 3]);
            return response()->json(['message' => 'El torneo ha finalizado. Ganador: jugador ID ' . $ganadores->first()]);
        }

        // Validar número par
        if ($ganadores->count() % 2 != 0) {
            return response()->json(['error' => 'Número impar de ganadores. No se puede generar la siguiente ronda.'], 400);
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


        $nuevosPartidos = Partido::with([])->where('torneo_id', $torneoId)->get();

        return response()->json([
            'message' => "Ronda $nuevaRonda generada exitosamente.",
            'data' => PartidoResource::collection($nuevosPartidos)
        ]);
    }


    public function index(Request $request, $torneoId)
    {

        $partidos = Partido::with([
        ])->where('torneo_id', $torneoId)->get();

        return response()->json([
            'message' => 'Partidos obtenidos correctamente.',
            'data' => PartidoResource::collection($partidos),
            'status' => 200
        ]);
    }


    

}
