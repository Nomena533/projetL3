<?php

namespace App\Models;

// Authenticatable est la classe de base permettant
// à un utilisateur de se connecter.
use Illuminate\Foundation\Auth\User as Authenticatable;

// Notifiable permet d'envoyer des notifications
// (emails, SMS, etc.).
use Illuminate\Notifications\Notifiable;

// HasApiTokens est indispensable pour Laravel Sanctum.
// C'est ce trait qui ajoute les méthodes :
// createToken()
// currentAccessToken()
// tokens()
use Laravel\Sanctum\HasApiTokens;

// HasFactory permet d'utiliser les Factories
// pour générer des données de test.
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    /*
    |--------------------------------------------------------------------------
    | Traits utilisés
    |--------------------------------------------------------------------------
    */

    use HasApiTokens, HasFactory, Notifiable;

    /*
    |--------------------------------------------------------------------------
    | Les colonnes autorisées lors d'un create()
    |--------------------------------------------------------------------------
    |
    | Si un champ n'est pas ici,
    | User::create() ne pourra pas l'insérer.
    |
    */

    protected $fillable = [
        'name',
        'firstname',
        'email',
        'password',
        'role_id'
    ];

    /*
    |--------------------------------------------------------------------------
    | Colonnes cachées
    |--------------------------------------------------------------------------
    |
    | Ces colonnes ne seront jamais retournées
    | lorsqu'on convertit le modèle en JSON.
    |
    */

    protected $hidden = [
        'password',
        'remember_token'
    ];

    /*
    |--------------------------------------------------------------------------
    | Casts
    |--------------------------------------------------------------------------
    |
    | Laravel convertit automatiquement
    | certaines colonnes.
    |
    */

    protected function casts(): array
    {
        return [

            // Convertit automatiquement en objet Date
            'email_verified_at' => 'datetime',

            // Permet à Laravel de hasher automatiquement
            // le mot de passe lorsqu'il est affecté
            'password' => 'hashed',

        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function cour()
    {
        return $this->hasMany(Cour::class, 'prof_id');
    }

}