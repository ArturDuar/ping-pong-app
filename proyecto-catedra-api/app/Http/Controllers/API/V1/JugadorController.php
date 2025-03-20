<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\JugadorResource;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class JugadorController extends Controller
{
    public function index(Request $request){
        $jugador = Jugador::with('usuario')
        ->where('id', Auth::id())
        ->get();

        if(empty($jugador)){
            return response()->json([
                'message' => 'No hay jugadores registrados',
                'status' => '404'
            ], 404);
        }

        return JugadorResource::collection($jugador);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'nombre_jugador' => 'required',
            'genero' => 'required',
            'enlace_fotografia' => 'required',
            'fecha_nacimiento' => 'required',
            'nacionalidad' => 'required',
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Datos incorrectos',
                'status' => 400,
                'errors' => $validator->errors()
            ];
            return response()->json($data, 400);
        }
        
        $jugador = Jugador::create([
            'nombre_jugador' => $request->nombre_jugador,
            'genero' => $request->genero,
            'enlace_fotografia' => $request->enlace_fotografia,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'nacionalidad' => $request->nacionalidad,
            'id_usuario' => Auth::id(),
        ]);

        if(!$jugador){
            $data = [
                'message' => 'Error al registrar el jugador',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'message' => 'Jugador registrado correctamente',
            'status' => 201,
        ];

        return response()->json($data, 201);
    }

    public function show($id){
        $jugador = Jugador::with('usuario')
        ->where('id_usuario', Auth::id())
        ->where('id', $id )
        ->first();

        if(empty($jugador)){
            return response()->json([
                'message' => 'No existe ese jugador',
                'status' => '404'
            ], 404);
        }

        return new JugadorResource($jugador);
    }

    public function update(Request $request, $id){
        $jugador = Jugador::find($id);

        if(!$jugador){
            $data = [
                'message'=> 'Este jugador no existe',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validatedData = Validator::make($request->all(),[
            'nombre_jugador' => 'required',
            'genero' => 'required',
            'enlace_fotografia' => 'required',
            'fecha_nacimiento' => 'required',
            'nacionalidad' => 'required',
        ]);

        if($validatedData->fails()){
            return response()->json([
                'message'=> 'El torneo no se pudo modificar',
                'status'=> 400,
                'errors' => $validatedData->errors()
            ], 400);
        }

        $jugador->nombre_jugador = $request->nombre_jugador;
        $jugador->enlace_fotografia = $request->enlace_fotografia;
        $jugador->genero = $request->genero;
        $jugador->fecha_nacimiento = $request->fecha_nacimiento;

        $jugador->save();

        $data = [
            'torneo' => $jugador,
            'message'=> 'Jugador modificado correctamente',
            'status'=> 200
        ];

        return response()->json($data,200);
    }

    public function destroy($id){
        $jugador = Jugador::find($id);

        if(!$jugador){
            $data = [
                'message' => 'Jugador no encontrado',
                'status'=> 404
            ];

            return response()->json($data, 404);
        }

        $jugador->delete();

        $data = [
            'message' => 'Jugador eliminado',
            'status'=> 200
        ];

        return response()->json($data, 200);
    }
}
