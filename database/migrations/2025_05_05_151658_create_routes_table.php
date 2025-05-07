<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id(); // id (PK)
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // FK to Users
            $table->string('title');
            $table->text('description');
            $table->string('destination_city');
            $table->json('stops'); // Array of strings (as JSON)
            $table->integer('likes')->default(0);
            $table->integer('days');
            $table->decimal('budget', 10, 2);
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('routes');
    }
};