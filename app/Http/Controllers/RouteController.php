<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Route;

class RouteController extends Controller
{
    public function index(Request $request)
    {
        // Get sorting parameters from the request
        $sortBy = $request->get('sort_by', 'created_at'); // Default to 'date_created'
        $sortOrder = $request->get('sort_order', 'desc'); // Default to 'desc'

        // Fetch sorted routes from the database
        $routes = Route::orderBy($sortBy, $sortOrder)->get();

        // Pass the sorted routes to the Routes page
        return Inertia::render('Routes', [
            'routes' => $routes,
            'sortBy' => $sortBy,
            'sortOrder' => $sortOrder,
        ]);
    }
}