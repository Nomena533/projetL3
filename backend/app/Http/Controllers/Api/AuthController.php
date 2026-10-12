<?php

namespace App\Http\Controllers\Api;

use App\Events\UserCreatedEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    /**
     * ============================================================
     * INSCRIPTION
     * ============================================================
     */
    public function register(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8', // confirmed : dois avoir un deuxième champ pour la confirmation du mot de passe dans l'interface user
            'role_id' => 'required|exists:roles,id', // role_id doit obligatoirement correspondre à un id existant dans la table roles
        ]);

        $user = User::create([
            'name' => $request->name,
            'firstname' => $request->firstname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Création d'un token Sanctum
        |--------------------------------------------------------------------------
        |
        | createToken() crée un nouveau token.
        |
        | plainTextToken est la chaîne que React devra conserver.
        |
        */

        event(new UserCreatedEvent($user));

        $token = $user
            ->createToken('react-app')
            ->plainTextToken;

        // Les données nécessaires aux formulaires sont chargées avant leur sérialisation.
        $user->load(['role', 'profilProfesseur', 'instruments:id,name', 'experienceProfesseur', 'parcourProfesseur']);

        return response()->json([
            'message' => 'Inscription réussie.',
            'user' => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    /**
     * ============================================================
     * CONNEXION
     * ============================================================
     */
    public function login(Request $request)
    {

        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Recherche de l'user et chargement de son role
        $user = User::with('role')->where('email', $validated['email'])->first();

        // Vérification des identifiants
        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiant incorrect',
            ], 401);
        }

        /*
        |--------------------------------------------------------------------------
        | Création d'un nouveau token
        |--------------------------------------------------------------------------
        */

        $token = $user
            ->createToken('react-app')
            ->plainTextToken;

        // Le même chargement est appliqué après connexion pour hydrater les profils sans rechargement.
        $user->load(['role', 'profilProfesseur', 'instruments:id,name', 'experienceProfesseur', 'parcourProfesseur']);

        /*
        |--------------------------------------------------------------------------
        | Retour vers React
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Connexion réussie.',
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    /**
     * ============================================================
     * PROFIL
     * ============================================================
     */
    public function profile(Request $request)
    {

        /*
        |--------------------------------------------------------------------------
        | $request->user()
        |--------------------------------------------------------------------------
        |
        | Sanctum lit automatiquement le Bearer Token.
        |
        | Il recherche ce token dans la table :
        |
        | personal_access_tokens
        |
        | Puis il retrouve l'utilisateur correspondant.
        |
        */

        // La réponse de profil fournit les mêmes champs enrichis qu'après une connexion.
        $user = $request->user()->load(['role', 'profilProfesseur', 'instruments:id,name', 'experienceProfesseur', 'parcourProfesseur']);

        return response()->json(['user' => new UserResource($user)]);

    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * ============================================================
     * DÉCONNEXION
     * ============================================================
     */
    public function logout(Request $request)
    {

        /*
        |--------------------------------------------------------------------------
        | currentAccessToken()
        |--------------------------------------------------------------------------
        |
        | Récupère uniquement le token utilisé
        | pour effectuer cette requête.
        |
        */

        $request->user()
            ->currentAccessToken()
            ->delete();

        /*
        |--------------------------------------------------------------------------
        | Le token est supprimé.
        |
        | React devra obligatoirement refaire un login
        | pour obtenir un nouveau token.
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);

    }

    public function updateProfile(Request $request)
    {
        // Toute modification cible exclusivement l'utilisateur authentifié, jamais un identifiant du formulaire.
        $user = $request->user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'telephone' => 'nullable|string|max:30',
            'bio' => 'nullable|string|max:10000',
            'password' => 'sometimes|nullable|string|min:8|confirmed',
            'photo' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:5120',
            'remove_photo' => 'sometimes|boolean',
            'titre' => 'sometimes|nullable|string|max:255',
            'ville' => 'sometimes|nullable|string|max:255',
            'annees_experiences' => 'sometimes|nullable|integer|min:0|max:100',
            'instrument_ids' => 'sometimes|nullable|json',
            'experiences' => 'sometimes|nullable|json',
            'parcours' => 'sometimes|nullable|json',
        ]);

        // Les tableaux JSON du formulaire sont validés à nouveau par ligne avant toute écriture en base.
        $isProfessor = mb_strtolower((string) $user->role?->name) === 'professeur';
        $experiences = $isProfessor && $request->exists('experiences')
            ? ($request->filled('experiences') ? json_decode($request->input('experiences'), true, 512, JSON_THROW_ON_ERROR) : [])
            : null;
        $parcours = $isProfessor && $request->exists('parcours')
            ? ($request->filled('parcours') ? json_decode($request->input('parcours'), true, 512, JSON_THROW_ON_ERROR) : [])
            : null;
        $instrumentIds = $isProfessor && $request->exists('instrument_ids')
            ? ($request->filled('instrument_ids') ? json_decode($request->input('instrument_ids'), true, 512, JSON_THROW_ON_ERROR) : [])
            : null;

        if ($isProfessor) {
            Validator::make(
                ['experiences' => $experiences, 'parcours' => $parcours, 'instrument_ids' => $instrumentIds],
                [
                    'experiences' => 'sometimes|array',
                    'experiences.*.poste' => 'required|string|max:255',
                    'experiences.*.lieu' => 'nullable|string|max:255',
                    'experiences.*.periode_debut' => 'nullable|date',
                    'experiences.*.periode_fin' => 'nullable|date',
                    'experiences.*.description' => 'nullable|string|max:10000',
                    'parcours' => 'sometimes|array',
                    'parcours.*.diplome' => 'required|string|max:255',
                    'parcours.*.etablissement' => 'nullable|string|max:255',
                    'parcours.*.periode_debut' => 'nullable|date',
                    'parcours.*.periode_fin' => 'nullable|date',
                    'instrument_ids' => 'sometimes|array',
                    'instrument_ids.*' => 'integer|distinct|exists:instruments,id',
                ]
            )->validate();
        }

        // Une nouvelle image est conservée jusqu'à la réussite de la transaction utilisateur.
        $oldPhoto = $user->photo;
        $newPhoto = $request->hasFile('photo')
            ? $request->file('photo')->store('avatar', 'public')
            : null;
        if ($request->hasFile('photo') && ! $newPhoto) {
            // Une erreur d'écriture du fichier est renvoyée avant toute mise à jour de profil.
            return response()->json([
                'message' => 'La photo n’a pas pu être enregistrée.',
            ], 500);
        }

        DB::transaction(function () use ($request, $user, $validated, $newPhoto, $isProfessor, $experiences, $parcours, $instrumentIds) {
            // Les informations communes sont enregistrées pour tous les rôles.
            $user->name = $validated['name'];
            $user->firstname = $validated['firstname'];
            $user->email = $validated['email'];
            $user->telephone = $validated['telephone'] ?? null;
            $user->bio = $validated['bio'] ?? null;

            // Le mot de passe ne change que lorsqu'un nouveau mot de passe non vide a été envoyé.
            if (! empty($validated['password'])) {
                $user->password = Hash::make($validated['password']);
            }

            // La suppression explicite d'une photo est distincte de l'absence de nouveau fichier.
            if ($newPhoto) {
                $user->photo = $newPhoto;
            } elseif ($request->boolean('remove_photo')) {
                $user->photo = null;
            }
            $user->save();

            // Les données de portfolio et les instruments ne concernent que le rôle professeur.
            if ($isProfessor) {
                $user->profilProfesseur()->updateOrCreate([], [
                    'specialite' => $validated['titre'] ?? null,
                    'ville' => $validated['ville'] ?? null,
                    'annees_experiences' => $validated['annees_experiences'] ?? 0,
                ]);
                if ($experiences !== null) {
                    $user->experienceProfesseur()->delete();
                    $user->experienceProfesseur()->createMany(array_map(
                        fn ($item) => [
                            'poste' => $item['poste'],
                            'lieu' => $item['lieu'] ?? null,
                            'periode_debut' => $item['periode_debut'] ?? null,
                            'periode_fin' => $item['periode_fin'] ?? null,
                            'description' => $item['description'] ?? null,
                        ],
                        $experiences
                    ));
                }
                if ($parcours !== null) {
                    $user->parcourProfesseur()->delete();
                    $user->parcourProfesseur()->createMany(array_map(
                        fn ($item) => [
                            'diplome' => $item['diplome'],
                            'etablissement' => $item['etablissement'] ?? null,
                            'periode_debut' => $item['periode_debut'] ?? null,
                            'periode_fin' => $item['periode_fin'] ?? null,
                        ],
                        $parcours
                    ));
                }
                if ($instrumentIds !== null) {
                    $user->instruments()->sync($instrumentIds);
                }
            }
        });

        // L'ancien fichier n'est supprimé qu'après validation des changements en base.
        if ($oldPhoto && ($newPhoto || $request->boolean('remove_photo'))) {
            if (! Storage::disk('public')->delete($oldPhoto)) {
                // Le profil reste enregistré, mais l'échec du nettoyage est visible dans les journaux serveur.
                Log::warning('Impossible de supprimer l’ancienne photo de profil.', [
                    'user_id' => $user->id,
                    'photo_path' => $oldPhoto,
                ]);
            }
        }

        // Le frontend reçoit immédiatement l'état à jour, sans exposer le hash du mot de passe.
        $user->load(['role', 'profilProfesseur', 'instruments:id,name', 'experienceProfesseur', 'parcourProfesseur']);

        return response()->json([
            'message' => 'Profil utilisateur modifié avec succès',
            'user' => new UserResource($user),
        ]);
    }
}
