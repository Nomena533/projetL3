<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $fillable = [
        "niveau_id",
        "user_id",
        "montant"
    ];

    public function instruments()
    {
        // inscription_instrument : table pivot entre inscription et instrument
        // withTimestamps() permet de gérer automatiquement les cols created_at et update_at dans la table pivot
        return $this->belongsToMany(
            Instrument::class,
            "inscription_instrument",
            "inscription_id",
            "instrument_id"
        )->withTimestamps();
    }
}
