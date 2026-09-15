<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        "inscription_id",
        "nombre_mois",
        "montant",
        "mode_paiement",
        "statut"
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }
}
