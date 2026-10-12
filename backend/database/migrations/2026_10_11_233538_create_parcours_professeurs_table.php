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
        Schema::create('parcours_professeurs', function (Blueprint $table) {
            $table->id();
            // La clé étrangère n'est pas unique : un professeur possède plusieurs formations.
            $table->foreignId('prof_id')->constrained('users')->cascadeOnDelete();
            $table->string('diplome');
            $table->string('etablissement')->nullable();
            $table->date('periode_debut')->nullable();
            $table->date('periode_fin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parcours_professeurs');
    }
};
