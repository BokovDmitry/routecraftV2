<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedRoute;
use Illuminate\Support\Facades\Auth;

class SavedRouteController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'route_id' => 'required|exists:routes,id', // Ensure the route exists
        ]);

        // Check if the route is already saved by the user
        $exists = SavedRoute::where('user_id', Auth::id())
            ->where('route_id', $validated['route_id'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Route already saved'], 409);
        }

        // Save the route
        SavedRoute::create([
            'user_id' => Auth::id(),
            'route_id' => $validated['route_id'],
        ]);

        return response()->json(['message' => 'Route saved successfully'], 201);
    }

    public function index()
{
    // Ensure the user is authenticated
    if (Auth::check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Fetch all saved routes for the authenticated user
    $savedRoutes = SavedRoute::with('route') // Assuming a relationship exists
        ->where('user_id', Auth::id())
        ->get();

    return response()->json([
        'saved_routes' => $savedRoutes,
    ]);
}
}