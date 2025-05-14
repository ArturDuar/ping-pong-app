<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TorneoResource;
use Illuminate\Http\Request;
use App\Models\Torneo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class TorneoController extends Controller
{
    public function index(Request $request){
        $user = Auth::user();
        $torneo = Torneo::with('usuario', 'estado')
        ->where('id_usuario', $user->id)
        ->get();

        if($torneo->isEmpty()){
            $data = [
                'message' => 'No hay torneos registrados',
                'status' => 200
            ];
            return response()->json($data, 200);
        }

        return response()->json([
            'message' => 'Torneos obtenidos',
            'data' =>TorneoResource::collection($torneo),
            'status' => '200'
        ], status: 200);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'nombre_torneo' => 'required',
            'descripcion' => '',
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
            'id_usuario' => Auth::id(),
            'id_estado' => 1
        ]);

        if(!$torneo){
            $data = [
                'message' => 'Error al registrar el torneo',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'data'  => new TorneoResource($torneo),
            'message' => 'Torneo registrado correctamente',
            'status' => 201,
        ];

        return response()->json($data, 201);
    }

    public function show($id){
        $user = Auth::user();
        $torneo = Torneo::with('usuario', 'estado')
        ->where('id_usuario', $user->id)
        ->where('id', $id)
        ->first();

        if(!$torneo){
            $data = [
                'message' => 'Torneo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        return response()->json([
            'message' => 'Torneos obtenido exitosamente',
            'data' => new TorneoResource($torneo),
            'status' => '200'
        ], status: 200);
    }

    public function update(Request $request, $id){

        $torneo = Torneo::find($id);

        if(!$torneo){
            $data = [
                'message'=> 'Este torneo no existe',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validatedData = Validator::make($request->all(),[
            'nombre_torneo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'lugar_evento' => 'nullable|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'categoria_genero'=> 'string',
        ]);

        if($validatedData->fails()){
            return response()->json([
                'message'=> 'El torneo no se pudo modificar',
                'status'=> 400,
                'errors' => $validatedData->errors()
            ], 400);
        }

        $torneo->nombre_torneo = $request->nombre_torneo;
        $torneo->descripcion = $request->descripcion;
        $torneo->lugar_evento = $request->lugar_evento;
        $torneo->fecha_inicio = $request->fecha_inicio;
        $torneo->fecha_fin = $request->fecha_fin;
        $torneo->categoria_genero = $request->categoria_genero;

        $torneo->save();

        $data = [
            'data' => $torneo,
            'message'=> 'Torneo modificado correctamente',
            'status'=> 200
        ];

        return response()->json($data,200);
    } 

    public function destroy($id){
        $torneo = Torneo::find($id);

        if(!$torneo){
            $data = [
                'message' => 'Torneo no encontrado',
                'status'=> 404
            ];

            return response()->json($data, 404);
        }

        $torneo->delete();

        $data = [
            'message' => 'Torneo eliminado',
            'status'=> 200
        ];

        return response()->json($data, 200);
    }
}
