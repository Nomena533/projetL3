<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience_professeur extends Model
{
    // Le nom de la table de migration diffère de la pluralisation Eloquent par défaut.
    protected $table = 'experiences_professeurs';

    protected $fillable = [
        'poste',
        'lieu',
        'periode_debut',
        'periode_fin',
        'description',
    ];

    public function professeur()
    {
        return $this->belongsTo(User::class, 'prof_id');
    }
}
