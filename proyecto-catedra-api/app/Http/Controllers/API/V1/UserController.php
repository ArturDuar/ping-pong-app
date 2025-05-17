<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    /**
     * Display a listing of authenticated users (admin only).
     */
    public function index()
    {
        // Solo accesible para administradores
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'No autorizado',
                'status' => Response::HTTP_FORBIDDEN
            ], Response::HTTP_FORBIDDEN);
        }

        $users = User::with(['torneos', 'jugador'])->get();

        return UserResource::collection($users)
            ->additional([
                'message' => 'Usuarios obtenidos',
                'status' => Response::HTTP_OK
            ]);
    }

    /**
     * Display the specified user (solo propio perfil o admin).
     */
    public function show($id)
    {
        $user = User::with(['torneos', 'jugador'])->find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado',
                'status' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        // Solo el propio usuario o un admin puede ver el perfil
        if (Auth::id() !== $user->id && !Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'No autorizado',
                'status' => Response::HTTP_FORBIDDEN
            ], Response::HTTP_FORBIDDEN);
        }

        return (new UserResource($user))
            ->additional([
                'message' => 'Usuario obtenido',
                'status' => Response::HTTP_OK
            ]);
    }

    /**
     * Update the specified user (solo propio perfil o admin).
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado',
                'status' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        // Solo el propio usuario o un admin puede actualizar
        if (Auth::id() !== $user->id && !Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'No autorizado',
                'status' => Response::HTTP_FORBIDDEN
            ], Response::HTTP_FORBIDDEN);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,'.$user->id,
            'password' => 'sometimes|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors(),
                'status' => Response::HTTP_BAD_REQUEST
            ], Response::HTTP_BAD_REQUEST);
        }

        $data = $request->all();
        
        // Hashear la contraseña si se proporciona
        if ($request->has('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        return (new UserResource($user->fresh()))
            ->additional([
                'message' => 'Usuario actualizado',
                'status' => Response::HTTP_OK
            ]);
    }

    /**
     * Remove the specified user (solo admin).
     */
    public function destroy($id)
    {
        // Solo administradores pueden eliminar usuarios
        if (!Auth::user()->isAdmin()) {
            return response()->json([
                'message' => 'No autorizado',
                'status' => Response::HTTP_FORBIDDEN
            ], Response::HTTP_FORBIDDEN);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado',
                'status' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        // No permitir auto-eliminación
        if (Auth::id() === $user->id) {
            return response()->json([
                'message' => 'No puedes eliminarte a ti mismo',
                'status' => Response::HTTP_FORBIDDEN
            ], Response::HTTP_FORBIDDEN);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuario eliminado',
            'status' => Response::HTTP_OK
        ]);
    }
}