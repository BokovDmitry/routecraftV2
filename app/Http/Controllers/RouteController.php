<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Route;
use Illuminate\Support\Facades\Auth;

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

    public function search(Request $request)
    {
        $request->validate([
            'destination_country' => 'required|string',
            'destination_city' => 'required|string',
        ]);

        $destinationCountry = $request->get('destination_country');
        $destinationCity = $request->get('destination_city');
        $days = $request->get('days');
        $budgetMin = $request->get('budget_min');
        $budgetMax = $request->get('budget_max');

        $query = Route::query();
        $query->where('destination_country', 'like', "%$destinationCountry%");
        $query->where('destination_city', 'like', "%$destinationCity%");

        if ($days) {
            $query->where('days', $days);
        }
        if ($budgetMin !== null && $budgetMax !== null) {
            $query->whereBetween('budget', [$budgetMin, $budgetMax]);
        }

        $routes = $query->get();

        return Inertia::render('Routes', [
            'routes' => $routes,
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'destination_city' => 'required|string|max:255',
            'destination_country' => 'required|string|max:255',
            'stops' => 'required|array', // Ensure stops is an array
            'stops.*' => 'string', // Each stop must be a string
            'days' => 'required|integer|min:1',
            'budget' => 'required|numeric|min:0',
        ]);
        $route = Route::create([
            'user_id' => Auth::id(), // Associate the route with the authenticated user
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'destination_city' => $validatedData['destination_city'],
            'destination_country' => $validatedData['destination_country'],
            'stops' => $validatedData['stops'],
            'days' => $validatedData['days'],
            'budget' => $validatedData['budget'],
        ]);
        return response()->json([
            'message' => 'Route created successfully!',
            'route' => $route,
        ], 201);
        }
}