<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RolePermission extends Model
{
    protected $fillable = [
        'role_id',
        'permission',
    ];

    public function roles()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
