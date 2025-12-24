<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Student extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'student_id',
        'name',
        'email',
        'password_hash',
        'phone',
    ];

    protected $hidden = [
        'password_hash',
    ];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}

