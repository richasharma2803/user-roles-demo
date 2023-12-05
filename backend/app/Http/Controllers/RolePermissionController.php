<?php

namespace App\Http\Controllers;

use App\Models\RolePermission;
use App\Role;
use App\Services\ResponseService;
use DummyFullModelClass;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    public $response;

    public function __construct(ResponseService $response = null)
    {
        $this->response = $response;
    }

    public function index()
    {
        $role_permissions = RolePermission::get();

        if ($role_permissions) {
            $data = ['role_permissions' => $role_permissions];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = '',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }

    public function assignRolePermission(Request $request, $id)
    {
        $permission = $request->permission;
        $role_permissions = RolePermission::where('role_id', $id)->first();
        $permissions = json_decode($role_permissions->permission);
        $index = array_search($permission, $permissions);

        if ($index !== false) {
            // Element exists, remove it
            unset($permissions[$index]);
        } else {
            // Element doesn't exist, add it
            $permissions[] = $permission;
        }
        $role_permissions->permission = json_encode($permissions);
        $role_permissions->save();

        if ($role_permissions) {
            $data = ['role_permissions' => $role_permissions];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'Role Permission updated!',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }
}
