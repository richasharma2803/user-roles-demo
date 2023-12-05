<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasFactory, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'role_id',
        'first_name',
        'last_name',
        'email',
        'password',
        'country_code',
        'mobile',
        'address',
        'dob',
        'gender',
        'hobbies',
        'number_of_attempts',
        'is_active',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var string[]
     */
    protected $hidden = [
        'password',
    ];

    public static function boot()
    {
        parent::boot();

        static::deleted(function ($user) {
            if ($user->image && file_exists($user->image?->path)) {
                unlink($user->image?->path);
            }
            $user->image?->delete();
        });
    }

    // public function setPasswordAttribute($password)
    // {
    //     $this->attributes['password'] = Hash::make($password);
    // }

    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function getImagePathAttrubite()
    {
        return $this->image->path;
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
