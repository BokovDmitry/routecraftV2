<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('routes', function (Blueprint $table) {
            $table->string('destination_country')->after('destination_city'); // Add the new column
        });
    }

    public function down(): void
    {
        Schema::table('routes', function (Blueprint $table) {
            $table->dropColumn('destination_country'); // Remove the column if rolled back
        });
    }
};