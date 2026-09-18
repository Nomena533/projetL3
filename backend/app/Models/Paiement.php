<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $fillable = [
        "inscription_id",
        "nombre_mois",
        "montant",
        "description",
        "mode_paiement",
        "numero_carte",
        "expiration_carte",
        "cvv_carte",
        "statut"
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }
}
