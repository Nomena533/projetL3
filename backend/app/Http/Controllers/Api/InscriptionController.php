<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use App\Models\Level;
use App\Models\User;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $niveauId)
    {
        $validated = $request->validate([
            "telephone" => 'required',
            "montant" => 'required',

            // Tableau instruments 
            "instruments" => 'required|array|min:1',

            // vérification pour les éléments dans le tableau instrument d'où le *
            "instruments.*" => 'exists:instruments,id'
        ]);

        // Récupère l'id de l'user connecté
        $userId = $request->user()->id;
        $validated['user_id'] = $userId;

        // Vérification du cour
        $niveau = Level::findOrFail($niveauId);

        $validated['niveau_id'] = $niveau->id;

        $inscription = Inscription::create($validated);

        // Création des lignes dans la table pivot par attach([]) 
        // le $validated['instruments'] est un tableau contenant les id des instruments séléctionnés
        $inscription->instruments()->attach($validated['instruments']);

        // MAJ du telephone de l'user
        $user = User::where("id", $userId)->update(["telephone" => $request->telephone]);

        return response()->json([
            'message' => 'Inscription réussi avec succès',
            'cour' => $inscription
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inscription $inscription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inscription $inscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inscription $inscription)
    {
        //
    }

    public function updateStatut(Request $request, $id)
    {
        // dd($request, $id);
        $inscription = Inscription::findOrFail($id);

        if (!$inscription) {
            return response()->json([
                'success' => false,
                'message' => 'Inscripitons introuvable'
            ], 404);
        }

        $inscription->niveau_id = $request->niveau_id;
        $inscription->montant = $request->montant;
        $inscription->statut = $request->statut;

        $inscription->save();

        return response()->json([
            'message' => "Statut de l'inscription modifié avec succès",
            'cour' => $inscription
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inscription $inscription)
    {
        //
    }
}
