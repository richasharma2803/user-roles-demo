<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public $response;

    public function __construct(ResponseService $response = null)
    {
        $this->response = $response;
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();
        $user['profile'] = $user->files->where('type', 'image')->pluck('path')->first();
        $user['rolePermission'] = json_decode($user->role->role_permission->permission);

        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken('auth_token')->accessToken;
                // return response([
                //     'token' => $token,
                //     'user' => $user,
                //     'message' => 'Logged In successfully!',
                //     'status' => true,
                // ]);

                return $this->response->getResponse(
                    $data = ['user' => $user, 'token' => $token],
                    $code = 200,
                    $status = true,
                    $message = 'Logged In successfully!'
                );
            } else {
                // return response([
                //     'token' => '',
                //     'user' => '',
                //     'message' => 'Password mismatch!!!',
                //     'status' => false,
                // ]);
                return $this->response->getResponse($data = '', $code = 422, $status = false, $message = 'Password mismatch!');
            }
        } else {
            // return response([
            //     'token' => '',
            //     'user' => '',
            //     'message' => 'User does not exist!!!',
            //     'status' => false,
            // ]);
            return $this->response->getResponse($data = '', $code = 422, $status = false, $message = 'User does not exist!');
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        // return response([
        //     'message' => 'Logged out successfully!!!',
        //     'status' => true,
        // ]);

        return $this->response->getResponse(
            $code = 200,
            $status = true,
            $message = 'Logged out successfully!',
        );
    }
}
