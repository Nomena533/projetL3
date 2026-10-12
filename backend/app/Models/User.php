<?php

namespace App\Models;

// Authenticatable est la classe de base permettant
// à un utilisateur de se connecter.
use Illuminate\Database\Eloquent\Factories\HasFactory;
// Notifiable permet d'envoyer des notifications
// (emails, SMS, etc.).
use Illuminate\Foundation\Auth\User as Authenticatable;
// HasApiTokens est indispensable pour Laravel Sanctum.
// C'est ce trait qui ajoute les méthodes :
// createToken()
// currentAccessToken()
// tokens()
use Illuminate\Notifications\Notifiable;
// HasFactory permet d'utiliser les Factories
// pour générer des données de test.
use Laravel\Sanctum\HasApiTokens;

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
        'bio',
        'email',
        'password',
        'role_id',
        'telephone',
        'photo',
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
        'remember_token',
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

    public function inscription()
    {
        return $this->hasMany(Inscription::class);
    }

    public function soumission()
    {
        return $this->hasMany(Soumission::class);
    }

    public function instruments()
    {
        // inscription_instrument : table pivot entre inscription et instrument
        // withTimestamps() permet de gérer automatiquement les cols created_at et update_at dans la table pivot
        return $this->belongsToMany(
            Instrument::class,
            'professeur_instrument',
            'prof_id',
            'instrument_id'
        )->withTimestamps();
    }

    public function profilProfesseur()
    {
        // Les tables de profil professeur relient leurs lignes via prof_id, et non via user_id.
        return $this->hasOne(Profil_professeur::class, 'prof_id');
    }

    public function parcourProfesseur()
    {
        // Un professeur peut déclarer plusieurs diplômes ou formations.
        return $this->hasMany(Parcour_professeur::class, 'prof_id');
    }

    public function experienceProfesseur()
    {
        // Un professeur peut enregistrer plusieurs expériences professionnelles.
        return $this->hasMany(Experience_professeur::class, 'prof_id');
    }
}
