<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        "titre",
        "description",
        "duree",
        "cour_id"
    ];

    public function cour () {
        return $this->belongsTo(Cour::class);
    }

    public function resource () {
        return $this->hasMany(Resource::class);
    }
}
