<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /**
     * ============================================================
     * INSCRIPTION
     * ============================================================
     */
    public function register(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Validation des données reçues
        |--------------------------------------------------------------------------
        |
        | validate() vérifie que les données respectent les règles.
        | Si une règle échoue, Laravel renvoie automatiquement une
        | réponse JSON avec les erreurs (HTTP 422).
        |
        */

        $request->validate([
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8', // confirmed : dois avoir un deuxième champ pour la confirmation du mot de passe dans l'interface user
            'role_id' => 'required|exists:roles,id' // role_id doit obligatoirement correspondre à un id existant dans la table roles
        ]);

        /*
        |--------------------------------------------------------------------------
        | Création de l'utilisateur
        |--------------------------------------------------------------------------
        |
        | Hash::make() chiffre le mot de passe.
        | Il ne faut JAMAIS enregistrer un mot de passe en clair.
        |
        */

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

        $token = $user
                    ->createToken('react-app')
                    ->plainTextToken;

        /*
        |--------------------------------------------------------------------------
        | Réponse JSON
        |--------------------------------------------------------------------------
        |
        | UserResource contrôle les informations envoyées.
        |
        */

        return response()->json([
            'message' => 'Inscription réussie.',
            'user' => new UserResource($user),
            'token' => $token
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
            'password' => 'required'
        ]);

        // Recherche de l'user et chargement de son role 
        $user = User::with('role')->where('email', $validated['email'])->first();

        // Vérification des identifiants
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'message' => 'Identifiant incorrect'
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

        /*
        |--------------------------------------------------------------------------
        | Retour vers React
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Connexion réussie.',
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function loginOriginal(Request $request)
    {

        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        /*
        |--------------------------------------------------------------------------
        | Vérification des identifiants
        |--------------------------------------------------------------------------
        |
        | Auth::attempt()
        |
        | Retourne true si l'utilisateur existe
        | ET que le mot de passe est correct.
        |
        */

        if (!Auth::attempt($request->only('email', 'password'))) {

            return response()->json([
                'message' => 'Email ou mot de passe incorrect.'
            ], 401);

        }

        /*
        |--------------------------------------------------------------------------
        | Auth::user()
        |--------------------------------------------------------------------------
        |
        | Retourne automatiquement l'utilisateur connecté.
        |
        */

        $user = Auth::user();

        /*
        |--------------------------------------------------------------------------
        | Création d'un nouveau token
        |--------------------------------------------------------------------------
        */

        $token = $user
                    ->createToken('react-app')
                    ->plainTextToken;

        /*
        |--------------------------------------------------------------------------
        | Retour vers React
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Connexion réussie.',
            'user' => new UserResource($user),
            'token' => $token
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

        return response()->json([
            'user' => $request->user()
        ]);

    }

    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user()
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
            'message' => 'Déconnexion réussie.'
        ]);

    }

    public function updateProfil(Request $request)
    {
        $userId = request()->user()->id;
        $user = User::findOrFail($userId);

        $request->validate([
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'confirmed|min:8'
        ]);

        $user->name = $request->name;
        $user->firstname = $request->firstname;
        $user->bio = $request->bio;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->telephone = $request->telephone;

        if ($request->hasFile('photo')) {
            // supprime l'ancienne image 
            if ($user->photo) {
                Storage::disk("public")->delete($user->photo);
            }

            $filename = uniqid("avatar_", true) . "." . $request->file("photo")->getClientOriginalExtension();

            // Store le fichier dans Storage/app/public/avatar
            $path = $request->file('photo')->storeAs("avatar", $filename, "public");

            $user->photo = $path;
        }
        
        $user->save();

        return response()->json([
            'message' => 'Profil utilisateur modifié avec succès',
            'utilisateur' => $user
        ], 201);
    }

}