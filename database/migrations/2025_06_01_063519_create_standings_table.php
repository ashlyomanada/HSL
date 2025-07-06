<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('standings', function (Blueprint $table) {
            $table->id(); // id (PK)

            $table->foreignId('league_id')
                ->constrained('leagues')
                ->onDelete('cascade');

            $table->foreignId('team_id')
                ->constrained('teams')
                ->onDelete('cascade');

            $table->integer('wins')->default(0);
            $table->integer('losses')->default(0);
            $table->integer('draws')->default(0);
            $table->integer('points')->default(0);
            $table->integer('rank')->nullable();

            $table->timestamp('updated_at')->useCurrent();

            // If you want to track created_at, replace above line with:
            // $table->timestamps();

            // Optionally, add unique constraint to prevent duplicate entries per league-team
            $table->unique(['league_id', 'team_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('standings');
    }
};