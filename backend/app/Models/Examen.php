<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $fillable = [
        "inscription_id",
        "date_examen",
        "type_examen",
        "statut",
        "note",
        "commentaire"
    ];

    protected $casts = [
        'date_examen' => 'datetime',
        'note' => 'decimal:2'
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }
}
