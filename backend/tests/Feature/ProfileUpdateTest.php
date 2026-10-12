<?php

use App\Models\Instrument;
use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;

// Le jeu de tables minimal isole le test du défaut de migration antérieur de la table paiements.
beforeEach(function () {
    foreach ([
        'professeur_instrument',
        'parcours_professeurs',
        'experiences_professeurs',
        'profils_professeurs',
        'instruments',
        'users',
        'roles',
    ] as $table) {
        Schema::dropIfExists($table);
    }

    Schema::create('roles', function (Blueprint $table) {
        $table->id();
        $table->string('name');
    });
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('firstname');
        $table->string('email')->unique();
        $table->string('password');
        $table->unsignedBigInteger('role_id');
        $table->string('telephone')->nullable();
        $table->string('photo')->nullable();
        $table->text('bio')->nullable();
        $table->timestamps();
    });
    Schema::create('instruments', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->timestamps();
    });
    Schema::create('profils_professeurs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id')->unique();
        $table->string('specialite')->nullable();
        $table->string('ville')->nullable();
        $table->unsignedSmallInteger('annees_experience')->default(0);
        $table->timestamps();
    });
    Schema::create('experiences_professeurs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id');
        $table->string('poste');
        $table->string('lieu')->nullable();
        $table->date('periode_debut')->nullable();
        $table->date('periode_fin')->nullable();
        $table->longText('description')->nullable();
        $table->timestamps();
    });
    Schema::create('parcours_professeurs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id');
        $table->string('diplome');
        $table->string('etablissement')->nullable();
        $table->date('periode_debut')->nullable();
        $table->date('periode_fin')->nullable();
        $table->timestamps();
    });
    Schema::create('professeur_instrument', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id');
        $table->unsignedBigInteger('instrument_id');
        $table->timestamps();
    });
});

// Les mises à jour communes doivent conserver le mot de passe quand aucun nouveau mot de passe n'est fourni.
it('updates the authenticated users common profile fields without changing the password', function () {
    $roleId = DB::table('roles')->insertGetId(['name' => 'eleve']);
    $user = User::create([
        'name' => 'Ancien nom',
        'firstname' => 'Ancien prénom',
        'email' => 'eleve@example.test',
        'password' => Hash::make('motdepasse-securise'),
        'role_id' => $roleId,
    ]);
    Sanctum::actingAs($user);

    $response = $this->putJson('/api/updateProfile', [
        'name' => 'Nouveau nom',
        'firstname' => 'Nouveau prénom',
        'email' => 'eleve@example.test',
        'telephone' => '0340000000',
        'bio' => 'Présentation mise à jour',
    ]);

    $response->assertOk()
        ->assertJsonPath('user.name', 'Nouveau nom')
        ->assertJsonPath('user.email', 'eleve@example.test');
    expect($user->fresh()->telephone)->toBe('0340000000')
        ->and(Hash::check('motdepasse-securise', $user->fresh()->password))->toBeTrue();
});

// Plusieurs expériences et formations doivent être persistées et remplaçables pour le professeur connecté.
it('saves multiple professor portfolio entries and selected instruments', function () {
    $roleId = DB::table('roles')->insertGetId(['name' => 'professeur']);
    $user = User::create([
        'name' => 'Professeur',
        'firstname' => 'Test',
        'email' => 'professeur@example.test',
        'password' => Hash::make('motdepasse-securise'),
        'role_id' => $roleId,
    ]);
    $instrument = Instrument::create(['name' => 'Piano']);
    Sanctum::actingAs($user);

    $response = $this->putJson('/api/updateProfile', [
        'name' => 'Professeur',
        'firstname' => 'Test',
        'email' => 'professeur@example.test',
        'titre' => 'Pianiste',
        'ville' => 'Antananarivo',
        'annees_experience' => 12,
        'instrument_ids' => json_encode([$instrument->id]),
        'experiences' => json_encode([
            ['poste' => 'Enseignant', 'lieu' => 'École A', 'description' => 'Cours particuliers'],
            ['poste' => 'Musicien', 'lieu' => 'Orchestre B', 'description' => 'Concerts'],
        ]),
        'parcours' => json_encode([
            ['diplome' => 'Licence', 'etablissement' => 'Conservatoire A'],
            ['diplome' => 'Master', 'etablissement' => 'Conservatoire B'],
        ]),
    ]);

    $response->assertOk()
        ->assertJsonPath('user.titre', 'Pianiste')
        ->assertJsonCount(2, 'user.experiences')
        ->assertJsonCount(2, 'user.parcours');
    expect($user->experienceProfesseur()->count())->toBe(2)
        ->and($user->parcourProfesseur()->count())->toBe(2)
        ->and($user->instruments()->count())->toBe(1);
});

// Cette migration vérifie aussi que les anciennes bases conservent leurs lignes tout en autorisant les listes.
it('upgrades the existing single-entry professor schema without losing profile data', function () {
    Schema::dropIfExists('professeur_instrument');
    Schema::dropIfExists('parcours_professeurs');
    Schema::dropIfExists('experiences_professeurs');
    Schema::dropIfExists('profils_professeurs');

    Schema::create('profils_professeurs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id')->unique();
        $table->string('specialite')->nullable();
        $table->string('ville')->nullable();
        $table->unsignedSmallInteger('annees_experiences')->default(0);
        $table->timestamps();
    });
    Schema::create('experiences_professeurs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id')->unique();
        $table->string('poste');
        $table->string('lieu');
        $table->date('periode_debut')->nullable();
        $table->date('periode_fin')->nullable();
        $table->longText('description');
        $table->timestamps();
    });
    Schema::create('parcours_professeurs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('prof_id')->unique();
        $table->string('diplome');
        $table->string('etablissement');
        $table->date('periode_debut')->nullable();
        $table->date('periode_fin')->nullable();
        $table->timestamps();
    });
    DB::table('profils_professeurs')->insert([
        'prof_id' => 42,
        'specialite' => 'Piano',
        'annees_experiences' => 8,
    ]);

    $migration = require base_path('database/migrations/2026_10_12_000000_align_professor_profile_schema.php');
    $migration->up();

    expect(Schema::hasColumn('profils_professeurs', 'annees_experience'))->toBeTrue()
        ->and(DB::table('profils_professeurs')->where('prof_id', 42)->value('specialite'))->toBe('Piano');

    DB::table('experiences_professeurs')->insert([
        ['prof_id' => 42, 'poste' => 'Professeur', 'lieu' => null, 'description' => null],
        ['prof_id' => 42, 'poste' => 'Musicien', 'lieu' => null, 'description' => null],
    ]);
    DB::table('parcours_professeurs')->insert([
        ['prof_id' => 42, 'diplome' => 'Licence', 'etablissement' => null],
        ['prof_id' => 42, 'diplome' => 'Master', 'etablissement' => null],
    ]);

    expect(DB::table('experiences_professeurs')->where('prof_id', 42)->count())->toBe(2)
        ->and(DB::table('parcours_professeurs')->where('prof_id', 42)->count())->toBe(2);
});
