<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SavedRoute;
use Illuminate\Support\Facades\Auth;

class SavedRouteController extends Controller
{
    public function index()
    {
        $savedRoutes = SavedRoute::where('user_id', Auth::id())->get(['route_id']);
        return response()->json($savedRoutes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'route_id' => 'required|exists:routes,id',
        ]);

        SavedRoute::create([
            'user_id' => Auth::id(),
            'route_id' => $request->route_id,
        ]);

        return response()->json(['message' => 'Route saved successfully'], 201);
    }

    public function destroy($routeId)
    {
        $savedRoute = SavedRoute::where('user_id', Auth::id())
            ->where('route_id', $routeId)
            ->first();

        if ($savedRoute) {
            $savedRoute->delete();
            return response()->json(['message' => 'Route removed successfully'], 200);
        }

        return response()->json(['message' => 'Route not found'], 404);
    }
}