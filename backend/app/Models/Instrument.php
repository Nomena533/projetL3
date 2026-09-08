<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    protected $fillable = [
        "name",
        "description",
        "image"
    ];

    public function cour() {
        return $this->hasMany(Cour::class);
    }
    
    public function inscriptions()
    {
        // inscription_instrument : table pivot entre inscription et instrument
        // withTimestamps() permet de gérer automatiquement les cols created_at et update_at dans la table pivot
        return $this->belongsToMany(
            Inscription::class,
            "inscription_instrument",
            "inscription_id",
            "instrument_id"
        )->withTimestamps();
    }

}
