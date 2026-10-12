<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transforme le modèle User
     * en tableau JSON.
     */
    public function toArray(Request $request): array
    {

        /*
        |--------------------------------------------------------------------------
        | Ici on décide exactement
        | ce que React recevra.
        |--------------------------------------------------------------------------
        */

        return [

            // id de l'utilisateur
            'id' => $this->id, // $this ici représente le model User($user) passé dans new UserResource() dans le AuthControler

            // Nom
            'name' => $this->name,

            // Prénom
            'firstname' => $this->firstname,

            // Email
            'email' => $this->email,

            // Role_id
            // 'role_id' => $this->role_id,
            'role' => $this->role?->name, // Le rôle peut être absent dans les anciennes données.

            // Champs communs utilisés par les paramètres et la fiche publique.
            'telephone' => $this->telephone,
            'bio' => $this->bio,
            'photo' => $this->photo,

            'created_at' => $this->created_at,

            // Date de modification
            'updated_at' => $this->updated_at,

            // Ces propriétés exposent sous les noms attendus par React les données métier des professeurs.
            'titre' => $this->whenLoaded('profilProfesseur', fn () => $this->profilProfesseur?->specialite),
            'ville' => $this->whenLoaded('profilProfesseur', fn () => $this->profilProfesseur?->ville),
            'annees_experience' => $this->whenLoaded('profilProfesseur', fn () => $this->profilProfesseur?->annees_experience),
            'specialites' => $this->whenLoaded('instruments', fn () => $this->instruments->pluck('name')->values()),
            'instruments' => $this->whenLoaded('instruments', fn () => $this->instruments->map(
                fn ($instrument) => ['id' => $instrument->id, 'name' => $instrument->name]
            )->values()),
            'experiences' => $this->whenLoaded('experienceProfesseur', fn () => $this->experienceProfesseur->map(
                fn ($experience) => [
                    'poste' => $experience->poste,
                    'lieu' => $experience->lieu,
                    'periode_debut' => $experience->periode_debut,
                    'periode_fin' => $experience->periode_fin,
                    'periode' => collect([$experience->periode_debut, $experience->periode_fin])->filter()->join(' – '),
                    'description' => $experience->description,
                ]
            )->values()),
            'parcours' => $this->whenLoaded('parcourProfesseur', fn () => $this->parcourProfesseur->map(
                fn ($parcours) => [
                    'diplome' => $parcours->diplome,
                    'etablissement' => $parcours->etablissement,
                    'periode_debut' => $parcours->periode_debut,
                    'periode_fin' => $parcours->periode_fin,
                    'periode' => collect([$parcours->periode_debut, $parcours->periode_fin])->filter()->join(' – '),
                ]
            )->values()),
        ];

    }
}
