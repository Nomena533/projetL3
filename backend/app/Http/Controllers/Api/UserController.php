<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use App\Models\User;
use App\Services\EligibiliteExamenService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Le chargement anticipé rend les données du portfolio disponibles sur les fiches publiques.
        $users = User::with([
            'role',
            'profilProfesseur',
            'instruments:id,name',
            'experienceProfesseur',
            'parcourProfesseur',
        ])->get();

        // On ajoute les champs de fiche publique sans modifier la forme brute attendue par les écrans existants.
        $users->each(function (User $user) {
            $profile = $user->profilProfesseur;
            $user->setAttribute('titre', $profile?->specialite);
            $user->setAttribute('ville', $profile?->ville);
            $user->setAttribute('annees_experience', $profile?->annees_experience);
            $user->setAttribute('specialites', $user->instruments->pluck('name')->values());
            $user->setAttribute('experiences', $user->experienceProfesseur->map(
                fn ($experience) => [
                    'poste' => $experience->poste,
                    'lieu' => $experience->lieu,
                    'periode_debut' => $experience->periode_debut,
                    'periode_fin' => $experience->periode_fin,
                    'periode' => collect([$experience->periode_debut, $experience->periode_fin])->filter()->join(' – '),
                    'description' => $experience->description,
                ]
            )->values());
            $user->setAttribute('parcours', $user->parcourProfesseur->map(
                fn ($parcours) => [
                    'diplome' => $parcours->diplome,
                    'etablissement' => $parcours->etablissement,
                    'periode_debut' => $parcours->periode_debut,
                    'periode_fin' => $parcours->periode_fin,
                    'periode' => collect([$parcours->periode_debut, $parcours->periode_fin])->filter()->join(' – '),
                ]
            )->values());
        });

        // role garde son format d'origine (objet) pour ne pas casser les listes et la messagerie.
        return response()->json($users);
    }

    public function userListInscription(EligibiliteExamenService $eligibiliteService, $userId)
    {
        $inscriptions = Inscription::where('user_id', $userId)->with(['level', 'instruments', 'paiements'])->get();
        $inscriptions->each(function($inscription) use($eligibiliteService) {
            $inscription->setAttribute('eligibilite', $eligibiliteService->calculer($inscription));
        });

        return response()->json($inscriptions);
    }
}
