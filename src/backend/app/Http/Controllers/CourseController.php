<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $courses = Course::all();
        return response()->json($courses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:courses,code',
            'name' => 'required|string',
            'credits' => 'required|integer|min:1',
            'instructor' => 'nullable|string',
        ]);

        $course = Course::create($validated);
        return response()->json($course, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course): JsonResponse
    {
        return response()->json($course);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'sometimes|required|string|unique:courses,code,' . $course->id,
            'name' => 'sometimes|required|string',
            'credits' => 'sometimes|required|integer|min:1',
            'instructor' => 'nullable|string',
        ]);

        $course->update($validated);
        return response()->json($course);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course): JsonResponse
    {
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }
}
