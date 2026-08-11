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
            'role' => $this->role->name, // Relation avec le model Role mise dans le model User

            // Date de création
            'created_at' => $this->created_at,

            // Date de modification
            'updated_at' => $this->updated_at,

        ];

    }

}