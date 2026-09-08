<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = [
        "name",
        "description",
        "duree"
    ];

    public function cour() {
        return $this->hasMany(Cour::class);
    }
}
