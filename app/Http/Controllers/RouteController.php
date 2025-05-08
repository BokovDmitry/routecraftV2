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
        $routes = Route::with('user')->orderBy($sortBy, $sortOrder)->get();

        // Pass the sorted routes to the Routes page
        return Inertia::render('Routes', [
            'routes' => $routes,
            'sortBy' => $sortBy,
            'sortOrder' => $sortOrder,
        ]);
    }

    public function search(Request $request)
{
    $query = Route::query();

    if ($request->filled('destination_country')) {
        $query->where('destination_country', 'like', "%{$request->destination_country}%");
    }

    if ($request->filled('destination_city')) {
        $query->where('destination_city', 'like', "%{$request->destination_city}%");
    }

    if ($request->filled('days')) {
        $query->where('days', $request->days);
    }

    if ($request->filled('budget_min') && $request->filled('budget_max')) {
        $query->whereBetween('budget', [$request->budget_min, $request->budget_max]);
    }

    if ($request->filled('must_see_places')) {
        $places = $request->input('must_see_places');
        $query->where(function ($q) use ($places) {
            foreach ($places as $place) {
                $q->orWhereJsonContains('stops', $place);
            }
        });
    }

    $routes = $query->with('user')->get();

    return Inertia::render('Routes', [
        'routes' => $routes,
        'filters' => $request->only(['destination_country', 'destination_city', 'days', 'budget_min', 'budget_max', 'must_see_places']),
    ]);
}
    

    public function store(Request $request)
{
    if (!Auth::check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    // Decode the stops JSON string into an array
    $stops = json_decode($request->input('stops'), true);

    // Extract only the 'places' arrays
    $processedStops = array_map(function ($stop) {
        return $stop['places'] ?? []; // Default to an empty array if 'places' is missing
    }, $stops);

    // Merge the processed stops back into the request
    $request->merge([
        'stops' => $processedStops,
    ]);

    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'destination_country' => 'required|string|max:255',
        'destination_city' => 'required|string|max:255',
        'description' => 'nullable|string',
        'budget' => 'required|numeric|min:0',
        'days' => 'required|integer|min:1',
        'stops' => 'required|array', // Ensure stops is an array
        'stops.*' => 'array', // Each stop must be an array
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate the image
    ]);

    // Handle the image upload
    if ($request->hasFile('image')) {
        $validatedData['image'] = $request->file('image')->store('routes', 'public');
    }

    // Create the route
    $route = Route::create([
        'user_id' => Auth::id(),
        ...$validatedData,
    ]);

    return redirect()->route('routes.index')->with('success', 'Route created successfully!');
}

    public function topLikedRoutes()
{
    $routes = Route::with('user') // Include the user relationship
        ->orderBy('likes', 'desc') // Sort by likes in descending order
        ->take(6) // Limit to 6 routes
        ->get();

    return response()->json([
        'routes' => $routes,
    ]);
}

    public function create()
    {
        return Inertia::render('CreateRoutePage');

    }

    public function show($id)
    {
        $route = Route::with('user')->findOrFail($id);
    
        return Inertia::render('RouteDetail', ['route' => $route]);

    }

    public function myRoutes()
{
    $user = Auth::user();

    $routes = Route::with('user')
        ->where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->get();

        return Inertia::render('MyRoutes', [
            'routes' => $routes,
            'user' => Auth::user(), 
        ]);
        
}

public function edit($id)
{
    $route = Route::findOrFail($id);
    return Inertia::render('EditRoutePage', ['route' => $route]);
}

public function toggleLike(Route $route)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $liked = $route->likes()->where('user_id', $user->id)->exists();

    if ($liked) {
        // Unlike the route
        $route->likes()->where('user_id', $user->id)->delete();
        $route->decrement('likes');
    } else {
        // Like the route
        $route->likes()->create(['user_id' => $user->id]);
        $route->increment('likes');
    }

    return response()->json(['liked' => !$liked]);
}
    public function getLikedStatus(Route $route)
    {
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['liked' => false]); // Default to not liked if user is not authenticated
        }
    
        $liked = $route->likes()->where('user_id', $user->id)->exists();
    
        return response()->json(['liked' => $liked]);
    }

    
}