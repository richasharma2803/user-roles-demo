<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'role_name',
        'is_active',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }

    public function role_permission()
    {
        return $this->hasOne(RolePermission::class, 'role_id');
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($role) {
            $role->role_permission->delete();
        });
    }
}
