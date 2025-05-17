<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TorneoResource;
use App\Models\Torneo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class TorneoController extends Controller
{
    public function index()
    {
        $torneos = Torneo::with('usuario', 'estado')
            ->where('id_usuario', Auth::id())
            ->get();

        return TorneoResource::collection($torneos)
            ->additional([
                'message' => $torneos->isEmpty() ? 'No hay torneos registrados' : 'Torneos obtenidos',
                'status' => $torneos->isEmpty() ? Response::HTTP_NOT_FOUND : Response::HTTP_OK
            ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_torneo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'lugar_evento' => 'required|string|max:255',
            'fecha_inicio' => 'required|date|after_or_equal:today',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'categoria_genero' => 'required|string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos incorrectos',
                'errors' => $validator->errors(),
                'status' => Response::HTTP_BAD_REQUEST
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $torneo = Torneo::create([
                'nombre_torneo' => $request->nombre_torneo,
                'descripcion' => $request->descripcion,
                'lugar_evento' => $request->lugar_evento,
                'fecha_inicio' => $request->fecha_inicio,
                'fecha_fin' => $request->fecha_fin,
                'categoria_genero' => $request->categoria_genero,
                'id_usuario' => Auth::id(),
                'id_estado' => 1 // Estado por defecto
            ]);

            return (new TorneoResource($torneo))
                ->additional([
                    'message' => 'Torneo registrado correctamente',
                    'status' => Response::HTTP_CREATED
                ])
                ->response()
                ->setStatusCode(Response::HTTP_CREATED);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar el torneo',
                'error' => $e->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $torneo = Torneo::with('usuario', 'estado')
            ->where('id_usuario', Auth::id())
            ->find($id);

        if (!$torneo) {
            return response()->json([
                'message' => 'Torneo no encontrado',
                'status' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        return (new TorneoResource($torneo))
            ->additional([
                'message' => 'Torneo obtenido exitosamente',
                'status' => Response::HTTP_OK
            ]);
    }

    public function update(Request $request, $id)
    {
        $torneo = Torneo::where('id_usuario', Auth::id())->find($id);

        if (!$torneo) {
            return response()->json([
                'message' => 'Torneo no encontrado',
                'status' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        $validator = Validator::make($request->all(), [
            'nombre_torneo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'lugar_evento' => 'required|string|max:255',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'categoria_genero' => 'required|string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos incorrectos',
                'errors' => $validator->errors(),
                'status' => Response::HTTP_BAD_REQUEST
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $torneo->update($request->all());

            return (new TorneoResource($torneo))
                ->additional([
                    'message' => 'Torneo actualizado correctamente',
                    'status' => Response::HTTP_OK
                ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el torneo',
                'error' => $e->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        $torneo = Torneo::where('id_usuario', Auth::id())->find($id);

        if (!$torneo) {
            return response()->json([
                'message' => 'Torneo no encontrado',
                'status' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        try {
            $torneo->delete();

            return response()->json([
                'message' => 'Torneo eliminado correctamente',
                'status' => Response::HTTP_OK
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el torneo',
                'error' => $e->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}