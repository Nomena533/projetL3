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
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId("cour_id")->constrained("cours")->onDelete("cascade");
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->unsignedTinyInteger("progression")->default(0);
            $table->enum("statut",["pending","confirmed","canceled"])->default("pending");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscriptions');
    }
};
