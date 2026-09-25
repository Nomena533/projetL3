<?php

namespace App\Http\Controllers\Api;

use App\Events\SoumissionCreatedEvent;
use App\Events\SoumissionSentEvent;
use App\Http\Controllers\Controller;
use App\Models\Exercice;
use App\Models\Soumission;
use Illuminate\Http\Request;

class SoumissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $soumission = Soumission::with(['exercice.lesson.cour.level','eleve'])->get();

        return response()->json($soumission);
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
    public function store(Request $request, $exerciceId)
    {
        $validated = $request->validate([
            "fichier" => 'required',
            "type" => 'required',
            "description" => 'string'
        ]);

        // Récupère l'id de l'user connecté
        $validated['user_id'] = $request->user()->id;

        $exercice = Exercice::findOrFail($exerciceId);
        $validated['exercice_id'] = $exercice->id;

        if ($request->hasFile('fichier')) {
            
            // Store le fichier dans Storage/app/public/soumissions
            $validated['fichier'] = $request->file('fichier')->store('soumissions', 'public');
        }   

        $soumission = Soumission::create($validated);

        event(new SoumissionCreatedEvent($soumission));

        return response()->json([
            'message' => 'Soumission enregistré avec succès',
            'soumission' => $soumission
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Soumission $soumission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Soumission $soumission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Soumission $soumission)
    {
        //
    }

    public function updateNoteSoumission(Request $request, $id)
    {
        // dd($request, $id);
        $soumission = Soumission::findOrFail($id);

        if (!$soumission) {
            return response()->json([
                'success' => false,
                'message' => 'Cours introuvable'
            ], 404);
        }

        $soumission->statut = $request->statut;
        $soumission->note = $request->note;
        $soumission->commentaire = $request->commentaire;

        $soumission->save();

        return response()->json([
            'message' => 'soumission corriger modifié avec succès',
            'soumission' => $soumission
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Soumission $soumission)
    {
        //
    }
}
