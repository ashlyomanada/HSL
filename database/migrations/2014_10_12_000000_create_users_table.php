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
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // id (PK)
            $table->string('name'); // name
            $table->string('email')->unique(); // email (unique)
            $table->string('password'); // password
            $table->enum('role', ['admin', 'coach', 'referee']); // role (enum)
            $table->unsignedBigInteger('team_id')->nullable(); // team_id (FK, nullable)
            // $table->foreign('team_id')->references('id')->on('teams')->onDelete('set null');
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};