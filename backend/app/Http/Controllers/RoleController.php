<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\RolePermission;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    public $response;

    public function __construct(ResponseService $response = null)
    {
        $this->response = $response;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::get();

        if ($roles) {
            $data = ['roles' => $roles];
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'role_name' => 'required|unique:roles'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $role = Role::create($request->all());

        RolePermission::create(['role_id' => $role->id, 'permission' => json_encode([])]);

        if ($role) {
            $data = ['role' => $role];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'New role added successfully!',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json(ResponseService::getResponse('', 200, '', 'Role not found!'));
        }

        if ($role) {
            $data = ['role' => $role];
            return response()->json(ResponseService::getResponse($data, 200, true, ''));
        }

        return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);

        $validator = Validator::make($request->all(), [
            'role_name' => [
                'required',
                Rule::unique('roles')->ignore($id)
            ]
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($role->update($request->all())) {
            $data = ['role' => $role];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'Role updated successfully!',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::findOrFail($id);

        if (!$role) {
            return response()->json(ResponseService::getResponse('', 422, '', 'Role not found!'));
        }

        if ($role->delete()) {
            return $this->response->getResponse(
                $data = '',
                $code = 200,
                $status = true,
                $message = 'Role deleted successfully',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }

    public function changeStatus($id)
    {
        $role = Role::findOrFail($id);

        $role->is_active = $role->is_active == 0 ? 1 : 0;
        $role->save();

        if ($role) {
            $data = ['role' => $role];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'Role status changed successfully',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }
}
