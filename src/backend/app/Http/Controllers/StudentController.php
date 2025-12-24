<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function getProfile(Request $request)
    {
        $student = $request->user();
        return response()->json([
            'success' => true,
            'student' => $student
        ]);
    }

    public function updatePhone(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $student = $request->user();
        $student->phone = $request->phone;
        $student->save();

        return response()->json([
            'success' => true,
            'message' => 'Phone number updated successfully',
            'student' => $student,
        ]);
    }
}

