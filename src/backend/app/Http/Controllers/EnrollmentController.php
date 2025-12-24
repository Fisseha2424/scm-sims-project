<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;

class EnrollmentController extends Controller
{
    public function getCourses(Request $request)
    {
        $student = $request->user();

        $enrollments = Enrollment::with('course')
            ->where('student_id', $student->id) // Assuming Eloquent relationship or direct ID match
            ->get();

        // Map to just courses
        $courses = $enrollments->map(function ($enrollment) {
            $course = $enrollment->course;
            // Add enrollment details if needed, or just return course info
            return $course;
        });

        return response()->json([
            'success' => true,
            'courses' => $courses
        ]);
    }

    public function getGrades(Request $request)
    {
        $student = $request->user();

        $enrollments = Enrollment::with('course')
            ->where('student_id', $student->id)
            ->get();

        return response()->json([
            'success' => true,
            'enrollments' => $enrollments
        ]);
    }
}
