<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = [
        "name",
        "description",
        "duree",
        "prix_mensuel",
        "droit_inscripition",
    ];

    public function cour() {
        return $this->hasMany(Cour::class);
    }

    public function inscription() {
        return $this->hasMany(Inscription::class);
    }
}
