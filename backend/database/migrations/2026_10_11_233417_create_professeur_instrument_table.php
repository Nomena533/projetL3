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
        Schema::create('professeur_instrument', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prof_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('instrument_id')->constrained('instruments')->cascadeOnDelete();
            // Empêche les doublons tout en permettant plusieurs instruments par professeur.
            $table->unique(['prof_id', 'instrument_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professeur_instrument');
    }
};
