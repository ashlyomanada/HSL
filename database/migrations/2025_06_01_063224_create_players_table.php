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
        Schema::create('players', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade'); // FK to teams
            $table->string('name');
            $table->integer('age');
            $table->string('position');
            $table->integer('jersey_number');
            $table->string('photo_url')->nullable(); // optional field
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};