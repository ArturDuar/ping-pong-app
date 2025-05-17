<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\V1\AdminResource;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['login', 'store']);
    }

    // POST /api/v1/admins/login
    public function login(Request $request)
    {
        $request->validate([
            'NombreUsuario' => 'required|string',
            'Contrasena' => 'required|string',
        ]);

        $admin = Admin::where('NombreUsuario', $request->NombreUsuario)->first();

        if (!$admin || !Hash::check($request->Contrasena, $admin->Contrasena)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'admin' => new AdminResource($admin),
            'token' => $token
        ]);
    }

    // GET /api/v1/admins
    public function index()
    {
        $this->authorize('viewAny', Admin::class);
        
        return AdminResource::collection(Admin::all());
    }

    // POST /api/v1/admins (registro)
    public function store(Request $request)
    {
        $request->validate([
            'AdminID' => 'required|unique:admins',
            'NombreUsuario' => 'required|unique:admins',
            'Correo' => 'required|email|unique:admins',
            'Contrasena' => 'required|min:8',
            'PrimerNombre' => 'required',
            'PrimerApellido' => 'required',
        ]);

        $admin = Admin::create([
            'AdminID' => $request->AdminID,
            'NombreUsuario' => $request->NombreUsuario,
            'Correo' => $request->Correo,
            'Contrasena' => Hash::make($request->Contrasena),
            'PrimerNombre' => $request->PrimerNombre,
            'SegundoNombre' => $request->SegundoNombre,
            'PrimerApellido' => $request->PrimerApellido,
            'SegundoApellido' => $request->SegundoApellido,
        ]);

        return new AdminResource($admin);
    }

    // GET /api/v1/admins/{AdminID}
    public function show(Admin $admin)
    {
        $this->authorize('view', $admin);
        return new AdminResource($admin);
    }

    // PUT/PATCH /api/v1/admins/{AdminID}
    public function update(Request $request, Admin $admin)
    {
        $this->authorize('update', $admin);

        $request->validate([
            'NombreUsuario' => 'sometimes|unique:admins,NombreUsuario,'.$admin->AdminID.',AdminID',
            'Correo' => 'sometimes|email|unique:admins,Correo,'.$admin->AdminID.',AdminID',
            'Contrasena' => 'sometimes|min:8',
        ]);

        $data = $request->all();
        
        if ($request->has('Contrasena')) {
            $data['Contrasena'] = Hash::make($request->Contrasena);
        }

        $admin->update($data);

        return new AdminResource($admin);
    }

    // DELETE /api/v1/admins/{AdminID}
    public function destroy(Admin $admin)
    {
        $this->authorize('delete', $admin);
        
        $admin->delete();
        return response()->noContent();
    }
}