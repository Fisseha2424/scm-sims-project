<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getModules()
    {
        return response()->json([
            'success' => true,
            'modules' => [
                'View Profile',
                'View Courses',
                'View Grades',
            ],
        ]);
    }
}

