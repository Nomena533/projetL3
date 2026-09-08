<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cour extends Model
{
    protected $fillable = [
        "prof_id",
        "instrument_id",
        "niveau_id",
        "titre",
        "description",
        "prix",
        "image",
        "duree"
    ];

    public function instrument() {
        return $this->belongsTo(Instrument::class);
    }

    public function prof() {
        return $this->belongsTo(User::class, 'prof_id');
    }

    public function level() {
        return $this->belongsTo(Level::class, 'niveau_id');
    }

    public function lesson () {
        return $this->hasMany(Lesson::class);
    }
}
