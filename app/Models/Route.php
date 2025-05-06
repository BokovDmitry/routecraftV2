<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Route extends Model
{
    protected $table = 'routes';

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'destination_city',
        'destination_country',
        'stops',
        'likes',
        'days',
        'budget',
        'image',
    ];

    protected $casts = [
        'stops' => 'array',   // Automatically cast JSON to array
        'budget' => 'float',
    ];

    // Relationship: Route belongs to the User who created it
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}