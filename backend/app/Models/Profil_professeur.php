<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profil_professeur extends Model
{
    // Le schéma existant utilise le pluriel français profils_professeurs.
    protected $table = 'profils_professeurs';

    protected $fillable = [
        'specialite',
        'ville',
        'annees_experiences',
    ];

    public function professeur()
    {
        return $this->belongsTo(User::class, 'prof_id');
    }
}
