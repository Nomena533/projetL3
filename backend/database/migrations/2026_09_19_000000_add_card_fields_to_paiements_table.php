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
        Schema::table('paiements', function (Blueprint $table) {
            $table->string('numero_carte')->nullable()->after('description');
            $table->string('expiration_carte', 5)->nullable()->after('numero_carte');
            $table->string('cvv_carte', 4)->nullable()->after('expiration_carte');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paiements', function (Blueprint $table) {
            $table->dropColumn([
                'numero_carte',
                'expiration_carte',
                'cvv_carte',
            ]);
        });
    }
};
