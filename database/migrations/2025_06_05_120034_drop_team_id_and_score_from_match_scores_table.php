<?php 

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('match_scores', function (Blueprint $table) {
            // Drop foreign key first, then the column
            $table->dropForeign(['team_id']);
            $table->dropColumn(['team_id', 'score']);
        });
    }

    public function down(): void
    {
        Schema::table('match_scores', function (Blueprint $table) {
            $table->foreignId('team_id')->constrained('teams')->onDelete('cascade');
            $table->integer('score');
        });
    }
};