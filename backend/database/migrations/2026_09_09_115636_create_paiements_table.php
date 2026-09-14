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
        Schema::create('paiementsBackup', function (Blueprint $table) {
            $table->id();
            $table->foreignId("inscription_id")->constrained("inscriptions")->cascadeOnDelete();
            $table->decimal("montant");
            $table->string("mode_paiement");
            $table->enum("statut",["pending","successful","failed"])->default("pending");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
