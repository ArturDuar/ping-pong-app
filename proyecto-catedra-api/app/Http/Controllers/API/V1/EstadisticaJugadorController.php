<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EstadisticaJugadorController extends Controller
{
    public function index()
    {
        $estadisticas = Jugador::select(
            'jugadores.id',
            'jugadores.enlace_fotografia',
            'jugadores.nombre_jugador',
            DB::raw('(SELECT COUNT(*) FROM partidos WHERE partidos.jugador1_id = jugadores.id OR partidos.jugador2_id = jugadores.id) as partidos_jugados'),
            DB::raw('(SELECT COUNT(*) FROM partidos WHERE partidos.ganador_id = jugadores.id) as partidos_ganados'),
            DB::raw('(SELECT COUNT(*) FROM torneos WHERE torneos.id_ganador = jugadores.id) as torneos_ganados')
        )
            ->orderByDesc('torneos_ganados')
            ->where('id_usuario', Auth::id())
            ->get();

        return response()->json([
            'data' => $estadisticas
        ]);
    }
}
