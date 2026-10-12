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
        Schema::create('profils_professeurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prof_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('specialite')->nullable();
            $table->string('ville')->nullable();
            // Le nom est identique au champ utilisé par le modèle et le formulaire professeur.
            $table->unsignedSmallInteger('annees_experiences')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profils_professeurs');
    }
};
