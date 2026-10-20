<?php

namespace App\Services;

use App\Models\Inscription;
use App\Models\Cour;
use App\Models\Lesson;
use App\Models\Exercice;
use App\Models\Soumission;
use Carbon\Carbon;

class EligibiliteExamenService
{
    public function calculer(Inscription $inscription): array
    {
        // Charger les informations nécessaires de l'inscription.
        $inscription->loadMissing([
            'level',
            'instruments',
            'paiements',
        ]);

        /*
         * 1. Vérifier les paiements validés.
         */

        // Exemple : "9 mois" devient 9.
        $dureeTexte = (string) ($inscription->level?->duree ?? '');

        preg_match('/\d+/', $dureeTexte, $correspondance);

        $dureeMois = isset($correspondance[0])
            ? (int) $correspondance[0]
            : null;

        // Additionner uniquement les mois des paiements validés.
        // Le droit d'inscription n'est pas compté comme un mois.
        $moisPayes = $inscription->paiements
            ->where('statut', 'validé')
            ->sum(
                fn($paiement) => is_numeric($paiement->nombre_mois)
                    ? (int) $paiement->nombre_mois
                    : 0
            );

        $paiementsOk = $dureeMois !== null
            && $dureeMois > 0
            && $moisPayes >= $dureeMois;


        /*
         * 2. Retrouver les cours publiés du niveau
         * et des instruments choisis par l'élève.
         */

        $instrumentIds = $inscription->instruments
            ->pluck('id');

        $coursIds = collect();

        if ($instrumentIds->isNotEmpty()) {
            $coursIds = Cour::query()
                ->where('niveau_id', $inscription->niveau_id)
                ->where('statut', 'publié')
                ->whereIn('instrument_id', $instrumentIds)
                ->pluck('id');
        }

        // Retrouver les leçons de ces cours.
        $lessonIds = $coursIds->isNotEmpty()
            ? Lesson::whereIn('cour_id', $coursIds)->pluck('id')
            : collect();

        // Tous les exercices de ces leçons sont obligatoires.
        $exercices = $lessonIds->isNotEmpty()
            ? Exercice::whereIn('lesson_id', $lessonIds)
            ->get(['id', 'titre'])
            : collect();


        /*
         * 3. Vérifier les exercices corrigés par le professeur.
         */

        $exerciceIds = $exercices->pluck('id');

        $exercicesCorrigesIds = $exerciceIds->isNotEmpty()
            ? Soumission::query()
            ->where('user_id', $inscription->user_id)
            ->where('statut', 'corriger')
            ->whereIn('exercice_id', $exerciceIds)
            ->distinct()
            ->pluck('exercice_id')
            : collect();

        $nombreExercices = $exercices->count();
        $nombreCorriges = $exercicesCorrigesIds->count();

        // Une absence d'exercices ne donne pas automatiquement
        // le droit de passer l'examen.
        $exercicesOk = $nombreExercices > 0
            && $nombreCorriges === $nombreExercices;


        /*
         * 4. Vérifier la date de fin de formation.
         */

        $dateFin = $inscription->date_fin ?? null;

        $dateFinAtteinte = $dateFin !== null
            && Carbon::parse($dateFin)->startOfDay()
            ->lte(Carbon::today());


        /*
         * 5. Calculer la décision finale.
         */

        $eligible = $paiementsOk
            && $exercicesOk
            && $dateFinAtteinte;

        return [
            'eligible' => $eligible,

            'criteres' => [
                [
                    'id' => 'paiements',
                    'titre' => 'Paiements de la formation',
                    'description' =>
                    'Tous les mois de formation doivent être payés et validés.',
                    'rempli' => $paiementsOk,
                    'detail' => $dureeMois !== null
                        ? "{$moisPayes} mois validés sur {$dureeMois}."
                        : 'La durée de formation ne peut pas être déterminée.',
                ],
                [
                    'id' => 'exercices',
                    'titre' => 'Exercices corrigés',
                    'description' =>
                    'Tous les exercices obligatoires doivent être corrigés par le professeur.',
                    'rempli' => $exercicesOk,
                    'detail' => $nombreExercices > 0
                        ? "{$nombreCorriges} exercice(s) corrigé(s) sur {$nombreExercices}."
                        : 'Aucun exercice trouvé dans les cours publiés concernés.',
                ],
                [
                    'id' => 'date_fin',
                    'titre' => 'Fin de formation',
                    'description' =>
                    'La date de fin prévue de la formation doit être atteinte.',
                    'rempli' => $dateFinAtteinte,
                    'detail' => $dateFin
                        ? 'Date de fin : ' . Carbon::parse($dateFin)->format('d/m/Y')
                        : 'La date de fin de formation est indisponible.',
                ],
            ],
        ];
    }
}
