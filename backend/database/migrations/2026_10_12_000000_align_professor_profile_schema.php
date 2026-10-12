<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Met à niveau les bases qui ont déjà appliqué les premières migrations du portfolio professeur.
     */
    public function up(): void
    {
        // Renomme l'ancien champ pour qu'il corresponde au nom utilisé par le modèle et l'API.
        if (
            Schema::hasTable('profils_professeurs')
            && Schema::hasColumn('profils_professeurs', 'annees_experiences')
            && ! Schema::hasColumn('profils_professeurs', 'annees_experience')
        ) {
            Schema::table('profils_professeurs', function (Blueprint $table) {
                $table->renameColumn('annees_experiences', 'annees_experience');
            });
        }

        // Retire l'unicité accidentelle de prof_id, sans toucher aux données déjà enregistrées.
        foreach (['experiences_professeurs', 'parcours_professeurs'] as $tableName) {
            if (! Schema::hasTable($tableName)) {
                continue;
            }

            foreach (Schema::getIndexes($tableName) as $index) {
                if ($index['unique'] && $index['columns'] === ['prof_id']) {
                    Schema::table($tableName, function (Blueprint $table) use ($index) {
                        $table->dropUnique($index['name']);
                    });
                }
            }
        }

        // Autorise les champs secondaires laissés vides dans les formulaires de portfolio.
        if (Schema::hasTable('experiences_professeurs')) {
            Schema::table('experiences_professeurs', function (Blueprint $table) {
                $table->string('lieu')->nullable()->change();
                $table->longText('description')->nullable()->change();
            });
        }

        if (Schema::hasTable('parcours_professeurs')) {
            Schema::table('parcours_professeurs', function (Blueprint $table) {
                $table->string('etablissement')->nullable()->change();
            });
        }
    }

    /**
     * La migration est volontairement non destructive : revenir en arrière réintroduirait des contraintes
     * incompatibles avec plusieurs expériences et formations pour un même professeur.
     */
    public function down(): void
    {
        //
    }
};
