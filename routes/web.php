<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\SavedRouteController;

Route::get('/routes', [RouteController::class, 'index'])->name('routes.index');


Route::middleware(['auth'])->group(function () {
    Route::get('/routes/create', [RouteController::class, 'create'])->name('routes.create');
    Route::post('/routes', [RouteController::class, 'store'])->name('routes.store');
    Route::get('/routes/{id}/edit', [RouteController::class, 'edit'])->name('routes.edit'); 
    Route::get('/routes/create', [RouteController::class, 'create'])->name('routes.create');
});

Route::post('/routes/{id}/update', [RouteController::class, 'update'])->name('routes.update');
Route::get('/routes/search', [RouteController::class, 'search'])->name('routes.search');

Route::get('/routes/{route}/liked-status', [RouteController::class, 'getLikedStatus']);
Route::post('/routes/{route}/like', [RouteController::class, 'toggleLike']);

Route::get('/routes/{id}', [RouteController::class, 'show'])->name('routes.show');

Route::get('/', function () {
    $topLikedRoutes = app(\App\Http\Controllers\RouteController::class)->topLikedRoutes()->getData()->routes;

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'topLikedRoutes' => $topLikedRoutes, // Pass the top-liked routes to the view
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::post('/saved-routes', [SavedRouteController::class, 'store'])->name('saved-routes.store');
    Route::get('/my-routes', [RouteController::class, 'myRoutes'])->name('my-routes');
    Route::post('/routes', [RouteController::class, 'store'])->name('routes.store');
    Route::delete('/saved-routes/{routeId}', [SavedRouteController::class, 'destroy'])->name('saved-routes.destroy');
    Route::get('/saved-routes', [SavedRouteController::class, 'index'])->name('saved-routes.index');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/saved-routes', [SavedRouteController::class, 'store'])->name('saved-routes.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/saved-routes', [SavedRouteController::class, 'index'])->name('saved-routes.index');
});

require __DIR__.'/auth.php';