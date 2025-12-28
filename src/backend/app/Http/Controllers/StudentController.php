<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|string|unique:students,student_id|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email|max:255',
            'phone' => 'required|string|regex:/^\+?[1-9]\d{1,14}$/|max:20',
            'department' => 'required|string|max:255',
            'year' => 'required|integer|min:1|max:5',
            'gpa' => 'required|numeric|min:0|max:4.0',
            'password' => 'required|string|min:6',
        ], [
            'student_id.required' => 'Student ID is required',
            'student_id.unique' => 'Student ID already exists',
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email already exists',
            'phone.required' => 'Phone number is required',
            'phone.regex' => 'Phone number must be in a valid format',
            'department.required' => 'Department is required',
            'year.required' => 'Year is required',
            'year.integer' => 'Year must be a number',
            'year.min' => 'Year must be at least 1',
            'year.max' => 'Year must be at most 5',
            'gpa.required' => 'GPA is required',
            'gpa.numeric' => 'GPA must be a number',
            'gpa.min' => 'GPA must be at least 0',
            'gpa.max' => 'GPA must be at most 4.0',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 6 characters',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $student = Student::create([
                'student_id' => $request->student_id,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'department' => $request->department,
                'year' => $request->year,
                'gpa' => $request->gpa,
                'password_hash' => Hash::make($request->password),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Student registered successfully',
                'student' => [
                    'id' => $student->id,
                    'student_id' => $student->student_id,
                    'name' => $student->name,
                    'email' => $student->email,
                    'phone' => $student->phone,
                    'department' => $student->department,
                    'year' => $student->year,
                    'gpa' => $student->gpa,
                ],
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Student registration error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred during registration. Please try again.',
            ], 500);
        }
    }
}

