<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class FavoritesController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Получаем только связанные маршруты из таблицы saved_routes
        $routes = $user->savedRoutes()
                       ->with('route.user') // подгружаем маршрут и владельца маршрута
                       ->get()
                       ->pluck('route')
                       ->filter(); // отфильтровать null, если какие-то routes удалены

        return Inertia::render('Favorites', [
            'routes' => $routes,
            'user' => $user,
        ]);
    }
}

