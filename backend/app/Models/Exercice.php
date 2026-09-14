<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    protected $fillable = [
        "titre",
        "description",
        "lesson_id"
    ];

    public function lesson()
    {
        return $this->belongsTo(Exercice::class);
    }
}
