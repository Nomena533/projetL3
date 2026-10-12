<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parcour_professeur extends Model
{
    // Le schéma utilise parcours_professeurs, nom qu'Eloquent ne déduit pas du modèle singularisé.
    protected $table = 'parcours_professeurs';

    protected $fillable = [
        'diplome',
        'etablissement',
        'periode_debut',
        'periode_fin',
    ];

    public function professeur()
    {
        return $this->belongsTo(User::class, 'prof_id');
    }
}
