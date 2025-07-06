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
       Schema::create('matches', function (Blueprint $table) {
    $table->id();

    $table->foreignId('league_id')
        ->constrained('leagues')
        ->onDelete('cascade');

    $table->foreignId('team_a_id')
        ->constrained('teams')
        ->onDelete('cascade');

    $table->foreignId('team_b_id')
        ->constrained('teams')
        ->onDelete('cascade');

    $table->dateTime('scheduled_datetime');

    $table->string('venue');

    $table->enum('status', ['Not Started', 'In Progress', 'Finished']);

    $table->foreignId('referee_id')
        ->nullable()
        ->constrained('users')
        ->onDelete('set null');

    $table->timestamps();
});


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};