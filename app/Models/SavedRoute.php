<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedRoute extends Model
{
    protected $fillable = ['user_id', 'route_id'];

    public $timestamps = false;

    // Define the relationship with the Route model
    public function route()
    {
        return $this->belongsTo(Route::class, 'route_id');
    }

    
}