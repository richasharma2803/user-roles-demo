<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
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
        $users = User::get();

        foreach ($users as $user) {
            $user['profile'] = $user->files->where('type', 'image')->pluck('path')->first();
        }

        $user['rolePermission'] = json_decode($user->role->role_permission->permission);

        if ($users) {
            $data = ['users' => $users];
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
        // dd($request->all());
        $doc_files = [];
        foreach ($request->allFiles() as $key => $file) {
            if (strpos($key, 'doc_') === 0) {
                array_push($doc_files, $file);
            }
        }
        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'country_code' => 'required|integer',
            'mobile' => 'required|integer',
            'address' => 'required|string',
            'dob' => 'required|string',
            'gender' => 'required|string',
            'image' => 'required|image',
            'hobbies' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $input = $request->all();
        $input['password'] = Hash::make($request->password);
        $input['hobbies'] = implode(",", $request->hobbies);

        $user = User::create($input);

        if ($request->hasFile('image')) {
            $file_ext = $request->file('image')->getClientOriginalExtension();
            $destination_path = './users/images/';
            $image = time() . '.' . $file_ext;

            if ($request->file('image')->move($destination_path, $image)) {
                $user->files()->create(['type' => 'image', 'path' => $image]);
            }
        }

        foreach ($doc_files as $key => $file) {

            $file_ext = $file->getClientOriginalExtension();
            $destination_path = './users/docs/';
            $doc_file = 'doc_' . $key + 1 . time() . '.' . $file_ext;
            if ($file->move($destination_path, $doc_file)) {
                $user->files()->create(['type' => 'file', 'path' => $doc_file]);
            }
        }

        $user->save();

        if ($user) {
            $data = ['user' => $user];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'New user added successfully!',
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
        $user = User::find($id);
        $user['profile'] = $user->files->where('type', 'image')->pluck('path')->first();
        $user['rolePermission'] = json_decode($user->role->role_permission->permission);

        if (!$user) {
            return response()->json(ResponseService::getResponse('', 200, '', 'User not found!'));
        }

        if ($user) {
            $data = ['user' => $user];
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
        $user = User::find($id);

        $doc_files = [];
        foreach ($request->allFiles() as $key => $file) {
            if (strpos($key, 'doc_') === 0) {
                array_push($doc_files, $file);
            }
        }

        $validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', 'string', Rule::unique('users')->ignore($id)],
            'password' => 'nullable|string|min:8',
            'country_code' => 'required|integer',
            'mobile' => 'required|integer',
            'address' => 'nullable|string',
            'dob' => 'nullable|string',
            'gender' => 'nullable|string',
            'image' => 'nullable',
            'hobbies' => 'nullable',
            'occupation' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $input = $request->all();

        if ($request->has('password')) {
            $input['password'] = Hash::make($request->password);
        }

        if ($request->has('hobbies')) {
            $input['hobbies'] = implode(",", $request->hobbies);
        }

        if ($request->hasFile('image')) {
            $original_filename = $request->file('image')->getClientOriginalName();
            $original_filename_arr = explode('.', $original_filename);
            $file_ext = $request->file('image')->getClientOriginalExtension();
            $destination_path = './users/images/';
            //code for remove old file
            $user_image = $user->files->where('type', 'image')->pluck('path')->first();
            if (!empty($user_image)  && $user_image != null) {
                $file_old = $destination_path . $user_image;
                unlink($file_old);
            }
            $image = time() . '.' . $file_ext;

            if ($request->file('image')->move($destination_path, $image)) {
                $user->files()->update(['type' => 'image', 'path' => $image]);
                $input['profile'] = $image;
            }
        }

        if (!empty($doc_files)) {
            $user_files = $user->files->where('type', 'file')->pluck('path')->all();

            foreach ($user_files as $file) {
                if (!empty($file)  && $file != null) {
                    $file_old = $destination_path . $user->doc_file;
                    unlink($file_old);
                    $file->delete();
                }
            }
            foreach ($doc_files as $key => $file) {

                $file_ext = $file->getClientOriginalExtension();
                $destination_path = './users/docs/';

                $doc_file = 'doc_' . $key + 1 . time() . '.' . $file_ext;
                if ($file->move($destination_path, $doc_file)) {
                    $user->files()->create(['type' => 'file', 'path' => $doc_file]);
                }
            }
        }
        if ($user->update($input)) {
            $currentUser = User::findOrFail($user->id);
            $currentUser['profile'] = $currentUser->files->where('type', 'image')->pluck('path')->first();
            $currentUser['rolePermission'] = json_decode($currentUser->role->role_permission->permission);
            $data = ['user' => $currentUser];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'User updated successfully!',
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
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(ResponseService::getResponse('', 422, '', 'User not found!'));
        }

        if ($user->delete()) {
            return $this->response->getResponse(
                $data = '',
                $code = 200,
                $status = true,
                $message = 'User deleted successfully',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }

    public function changeStatus($id)
    {
        $user = User::findOrFail($id);

        $user->is_active = $user->is_active == 0 ? 1 : 0;
        $user->save();

        if ($user) {
            $data = ['user' => $user];
            return $this->response->getResponse(
                $data = $data,
                $code = 200,
                $status = true,
                $message = 'User status changed successfully',
            );
        } else {
            return response()->json(ResponseService::getResponse('', 200, '', 'Something wrong please try later!'));
        }
    }
}
