<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CourseController;

Route::get('/test', function () {
    return response()->json(['status' => 'ok', 'message' => 'API is working']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/students/register', [StudentController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard-modules', [DashboardController::class, 'getModules']);
    Route::get('/profile', [StudentController::class, 'getProfile']);
    Route::post('/update-phone', [StudentController::class, 'updatePhone']);
    Route::get('/courses', [\App\Http\Controllers\EnrollmentController::class, 'getCourses']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{course}', [CourseController::class, 'show']);
    Route::put('/courses/{course}', [CourseController::class, 'update']);
    Route::delete('/courses/{course}', [CourseController::class, 'destroy']);
    Route::get('/grades', [\App\Http\Controllers\EnrollmentController::class, 'getGrades']);
    Route::post('/logout', [AuthController::class, 'logout']); // I found I missed logout in AuthController
});
