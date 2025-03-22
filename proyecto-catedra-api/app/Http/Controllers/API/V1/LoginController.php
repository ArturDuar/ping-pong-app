<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function register(Request $request){
        
        if(User::where('email', $request->email)->exists()){
            return response()->json([
                'message' => 'El correo ya está registrado'
            ], 400);
        }

        $user = User::create([
            "name"=> $request->name,
            "email"=> $request->email,
            "password"=> Hash::make($request->password)
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado',
            'token' => $token,
            'user' => $user
        ], 201);
        
    }

    public function login(Request $request){
        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        return response()->json([
            'user' => [
                'name' => $user->name,
                'email' => $user->email
            ],
            'token' => $user->createToken('token')->plainTextToken
        ], 200);
    }

    public function logout(Request $request)
    {
        if ($request->user()) {
            // Eliminar el token de acceso actual
            $request->user()->currentAccessToken()->delete();
    
            return response()->json([
                'message' => 'Sesión cerrada correctamente'
            ]);
        }
    
        return response()->json([
            'message' => 'No estás autenticado'
        ], 401);
    }
}
