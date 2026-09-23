<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Soumission extends Model
{
    protected $fillable = [
        "exercice_id",
        "user_id",
        "fichier",
        "type",
        "description",
        "note",
        "commentaire"
    ];

    public function exercice()
    {
        return $this->belongsTo(Exercice::class);
    }

    public function eleve()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}
