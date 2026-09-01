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
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->foreignId("prof_id")->constrained("users")->cascadeOnDelete();
            $table->foreignId("instrument_id")->constrained("instruments")->cascadeOnDelete();
            $table->foreignId("niveau_id")->constrained("levels")->cascadeOnDelete();
            $table->string("titre");
            $table->longText("description");
            $table->decimal("prix");
            $table->string("image");
            $table->string("duree");
            $table->enum("statut",["brouillon", "publié"])->default("brouillon");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
