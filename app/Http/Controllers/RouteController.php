<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Route;

class RouteController extends Controller
{
    public function index()
    {
        $routes = Route::all(); // Fetch all routes from the database
        return Inertia::render('Routes', [
            'routes' => $routes,
        ]);
    }
}