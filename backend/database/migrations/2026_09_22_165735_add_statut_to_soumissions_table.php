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
        Schema::table('soumissions', function (Blueprint $table) {
            $table->enum("statut",["en attente", "corriger"])->default("en attente")->after("commentaire");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('soumissions', function (Blueprint $table) {
            $table->dropColumn("statut");
        });
    }
};
