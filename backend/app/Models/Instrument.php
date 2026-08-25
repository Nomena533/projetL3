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
}
