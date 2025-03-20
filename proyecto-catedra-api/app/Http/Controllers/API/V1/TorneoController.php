<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Torneo;
use Illuminate\Support\Facades\Validator;
class TorneoController extends Controller
{
    public function index(Request $request){
        $torneo = torneo::all()->where('id_usuario', $request->user()->id);

        if($torneo->isEmpty()){
            $data = [
                'message' => 'No hay torneos registrados',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        return response()->json($torneo, 200);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'nombre_torneo' => 'required',
            'descripcion' => 'required',
            'lugar_evento' => 'required',
            'fecha_inicio' => 'required',
            'fecha_fin' => 'required',
            'categoria_genero' => 'required'
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Datos incorrectos',
                'status' => 400,
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }

        $torneo = Torneo::create([
            'nombre_torneo' => $request->nombre_torneo,
            'descripcion' => $request->descripcion,
            'lugar_evento' => $request->lugar_evento,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'categoria_genero' => $request->categoria_genero,
            'id_usuario' => $request->user()->id
        ]);

        if(!$torneo){
            $data = [
                'message' => 'Error al registrar el torneo',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Torneo registrado correctamente',
            'status' => 201,
        ];

        return response()->json($data, 201);
    }
}
