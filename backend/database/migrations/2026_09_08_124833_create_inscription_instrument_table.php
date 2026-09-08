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
        Schema::create('inscription_instrument', function (Blueprint $table) {
            $table->id();
            $table->foreignId("inscription_id")->constrained("inscriptions")->cascadeOnDelete();
            $table->foreignId("instrument_id")->constrained("instruments")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscription_instrument');
    }
};
