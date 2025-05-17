<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\JugadorResource;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class JugadorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $query = Jugador::with('usuario');

        if ($request->has('genero')) {
            $query->where('genero', $request->genero);
        }

        if ($request->has('usuario_id')) {
            $query->where('id_usuario', $request->usuario_id);
        }

        if ($request->has('nombre')) {
            $query->where('nombre_jugador', 'like', '%'.$request->nombre.'%');
        }

        $sortField = $request->input('sort', 'nombre_jugador');
        $sortDirection = $request->input('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $jugadores = $query->paginate($request->per_page ?? 15);

        return JugadorResource::collection($jugadores);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_jugador' => 'required|string|max:100',
            'genero' => 'required|in:Masculino,Femenino,Otro',
            'fotografia' => 'nullable|image|max:2048',
            'fecha_nacimiento' => 'required|date',
            'nacionalidad' => 'required|string|max:50',
            'id_usuario' => 'required|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Procesar imagen si existe
        if ($request->hasFile('fotografia')) {
            $path = $request->file('fotografia')->store('jugadores', 'public');
            $data['enlace_fotografia'] = $path;
        }

        $jugador = Jugador::create($data);

        return new JugadorResource($jugador);
    }


    public function show(Jugador $jugador)
    {
        $jugador->load('usuario');
        return new JugadorResource($jugador);
    }


    public function update(Request $request, Jugador $jugador)
    {
        $validator = Validator::make($request->all(), [
            'nombre_jugador' => 'sometimes|string|max:100',
            'genero' => 'sometimes|in:Masculino,Femenino,Otro',
            'fotografia' => 'nullable|image|max:2048',
            'fecha_nacimiento' => 'sometimes|date',
            'nacionalidad' => 'sometimes|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        if ($request->hasFile('fotografia')) {
            // Eliminar imagen anterior si existe
            if ($jugador->enlace_fotografia) {
                Storage::disk('public')->delete($jugador->enlace_fotografia);
            }
            
            $path = $request->file('fotografia')->store('jugadores', 'public');
            $data['enlace_fotografia'] = $path;
        }

        $jugador->update($data);

        return new JugadorResource($jugador);
    }

    public function destroy(Jugador $jugador)
    {
        if ($jugador->enlace_fotografia) {
            Storage::disk('public')->delete($jugador->enlace_fotografia);
        }

        $jugador->delete();

        return response()->json(null, 204);
    }
}