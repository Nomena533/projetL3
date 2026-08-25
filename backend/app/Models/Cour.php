<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cour extends Model
{
    protected $fillable = [
        "prof_id",
        "instrument_id",
        "level_id",
        "titre",
        "description",
        "prix",
        "image",
        "duree"
    ];

    public function instrument() {
        return $this->belongsTo(Instrument::class);
    }
}
