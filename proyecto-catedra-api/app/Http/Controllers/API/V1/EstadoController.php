<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\EstadoResource;
use App\Models\Estado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EstadoController extends Controller
{
    /**
     * Obtener todos los estados
     */
    public function index(Request $request)
    {
        $query = Estado::query();

        // Filtro por nombre
        if ($request->has('nombre')) {
            $query->where('nombre_estado', 'like', '%'.$request->nombre.'%');
        }

        // Ordenación
        $sortField = $request->input('sort', 'nombre_estado');
        $sortDirection = $request->input('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        // Paginación
        $estados = $query->paginate($request->per_page ?? 15);

        return EstadoResource::collection($estados);
    }

    /**
     * Crear un nuevo estado
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_estado' => 'required|string|max:50|unique:estados,nombre_estado',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $estado = Estado::create($validator->validated());

        return new EstadoResource($estado);
    }

    /**
     * Mostrar un estado específico
     */
    public function show(Estado $estado)
    {
        return new EstadoResource($estado);
    }

    /**
     * Actualizar un estado
     */
    public function update(Request $request, Estado $estado)
    {
        $validator = Validator::make($request->all(), [
            'nombre_estado' => 'required|string|max:50|unique:estados,nombre_estado,'.$estado->id_estado.',id_estado',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $estado->update($validator->validated());

        return new EstadoResource($estado);
    }

    /**
     * Eliminar un estado
     */
    public function destroy(Estado $estado)
    {
        // Verificar si el estado está siendo usado
        if ($estado->torneos()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar el estado porque está asociado a torneos',
            ], 409);
        }

        $estado->delete();

        return response()->json(null, 204);
    }
}