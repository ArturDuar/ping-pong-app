<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\JugadorResource;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class JugadorController extends Controller
{
    public function index(Request $request)
    {
        $jugador = Jugador::with('usuario')
            ->where('id_usuario', Auth::user()->id)
            ->get();

        if ($jugador->isEmpty()) {

            $data = [
                'message' => 'No hay jugadores registrados',
                'status' => 200
            ];
            return response()->json($data, 200);
        }

        return response()->json([
            'message' => 'Jugadores obtenidos',
            'data' => JugadorResource::collection($jugador),
            'status' => '200'
        ], status: 200);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_jugador' => 'required',
            'genero' => 'required',
            'fotografia' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fecha_nacimiento' => 'required',
            'nacionalidad' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos incorrectos',
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        // Guardar la imagen
        $path = $request->file('fotografia')->store('fotos', 'public');
        // Guardar la imagen solo si se envió una
        $url_foto = null;

        if ($request->hasFile('fotografia')) {
            $path = $request->file('fotografia')->store('fotos', 'public');
            $url_foto = asset('storage/' . $path);
        }


        // Crear el jugador
        $jugador = Jugador::create([
            'nombre_jugador' => $request->nombre_jugador,
            'genero' => $request->genero,
            'enlace_fotografia' => $url_foto,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'nacionalidad' => $request->nacionalidad,
            'id_usuario' => Auth::id(),
        ]);
        

        if (!$jugador) {
            return response()->json([
                'message' => 'Error al registrar el jugador',
                'status' => 500
            ], 500);
        }

        return response()->json([
            'data' => new JugadorResource($jugador),
            'message' => 'Jugador registrado correctamente',
            'status' => 201,
        ], 201);
    }


    public function show($id)
    {
        $jugador = Jugador::with('usuario')
            ->where('id_usuario', Auth::id())
            ->where('id', $id)
            ->first();

        if (empty($jugador)) {
            return response()->json([
                'message' => 'No existe ese jugador',
                'status' => '404'
            ], 404);
        }

        return response()->json([
            'data' => new JugadorResource($jugador),
            'message' => 'Jugador obtenido exitosamente',
            'status' => 200
        ]);
    }

    public function update(Request $request, $id)
    {
        $jugador = Jugador::where('id', $id)
            ->where('id_usuario', Auth::id())
            ->first();

        if (!$jugador) {
            return response()->json([
                'message' => 'Este jugador no existe',
                'status' => 404
            ], 404);
        }

        Log::info('Datos recibidos en update:', [
            'all' => $request->all(),
            'files' => $request->files->all(),
            'method' => $request->method(),
            'isPut' => $request->isMethod('put'),
            'headers' => $request->headers->all(),
        ]);
        

        $validatedData = Validator::make($request->all(), [
            'nombre_jugador' => 'required',
            'genero' => 'required',
            'fotografia' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fecha_nacimiento' => 'required',
            'nacionalidad' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'message' => 'El jugador no se pudo modificar',
                'status' => 400,
                'errors' => $validatedData->errors()
            ], 400);
        }

        // Si se sube una nueva imagen, elimina la anterior y guarda la nueva
        if ($request->hasFile('fotografia')) {
            // Extraer el nombre del archivo anterior desde la URL
            $rutaAnterior = str_replace(asset('storage') . '/', '', $jugador->enlace_fotografia);

            // Borrar la imagen anterior del disco
            Storage::disk('public')->delete($rutaAnterior);

            // Guardar la nueva imagen
            $path = $request->file('fotografia')->store('fotos', 'public');
            $jugador->enlace_fotografia = asset('storage/' . $path);
        }

        // Actualizar los campos restantes
        $jugador->nombre_jugador = $request->nombre_jugador;
        $jugador->genero = $request->genero;
        $jugador->fecha_nacimiento = $request->fecha_nacimiento;
        $jugador->nacionalidad = $request->nacionalidad;

        $jugador->save();

        return response()->json([
            'data' => new JugadorResource($jugador),
            'message' => 'Jugador modificado correctamente',
            'status' => 200
        ], 200);
    }

    public function destroy($id)
    {
        $jugador = Jugador::where('id', $id)
                  ->where('id_usuario', Auth::id())
                  ->first();
                  
        if (!$jugador) {
            $data = [
                'message' => 'Jugador no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $jugador->delete();

        $data = [
            'message' => 'Jugador eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function getEstadisticas(){
        
    }
}
