<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\AdminRegistroResource;
use App\Models\AdminRegistro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminRegistroController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('can:view,admin-registro')->only(['index', 'show']);
        $this->middleware('can:create,admin-registro')->only(['store']);
    }

    /**
     * Obtener todos los registros de actividad
     */
    public function index(Request $request)
    {
        $query = AdminRegistro::with(['admin', 'torneo'])
            ->orderBy('FechaHora', 'desc');

        // Filtros
        if ($request->has('admin_id')) {
            $query->where('AdminID', $request->admin_id);
        }

        if ($request->has('torneo_id')) {
            $query->where('TorneoID', $request->torneo_id);
        }

        if ($request->has('accion')) {
            $query->where('Accion', 'like', '%'.$request->accion.'%');
        }

        // Paginación
        $registros = $query->paginate($request->per_page ?? 15);

        return AdminRegistroResource::collection($registros);
    }

    /**
     * Registrar una nueva acción administrativa
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'AdminID' => 'required|exists:admins,AdminID',
            'TorneoID' => 'required|exists:torneos,TorneoID',
            'Accion' => 'required|string|max:255',
            'FechaHora' => 'sometimes|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();
        
        // Si no se proporciona FechaHora, usar la actual
        if (!isset($data['FechaHora'])) {
            $data['FechaHora'] = now();
        }

        $registro = AdminRegistro::create($data);

        return new AdminRegistroResource($registro);
    }

    /**
     * Mostrar un registro específico
     */
    public function show(AdminRegistro $adminRegistro)
    {
        $adminRegistro->load(['admin', 'torneo']);
        return new AdminRegistroResource($adminRegistro);
    }
}