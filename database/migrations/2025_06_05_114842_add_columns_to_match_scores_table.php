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
        Schema::table('match_scores', function (Blueprint $table) {
            $table->foreignId('team_a_id')
                ->constrained('teams')
                ->onDelete('cascade');

            $table->foreignId('team_b_id')
                ->constrained('teams')
                ->onDelete('cascade');

            $table->integer('team_a_score')->default(0);
            $table->integer('team_b_score')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('match_scores', function (Blueprint $table) {
            // Remove newly added columns
            $table->dropForeign(['match_id']);
            $table->dropForeign(['team_a_id']);
            $table->dropForeign(['team_b_id']);
            $table->dropForeign(['updated_by']);

            $table->dropColumn(['match_id', 'team_a_id', 'team_b_id', 'team_a_score', 'team_b_score', 'updated_by']);
        });
    }
};