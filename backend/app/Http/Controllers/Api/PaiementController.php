<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use App\Models\Paiement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paiement = Paiement::all();

        return response()->json($paiement);
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
    public function store(Request $request, $inscriptionId)
    {
        $validated = $request->validate([
            "nombre_mois" => 'required',
            "montant" => 'required',
            "mode_paiement" => 'required',
        ]);

        $inscription = Inscription::findOrFail($inscriptionId);

        // Récuperation de l'id du cour vérifié
        $validated['inscription_id'] = $inscription->id;

        $paiement = Paiement::create($validated);

        return response()->json([
            'message' => "Paiement effectué avec succès",
            'paiement' => $paiement
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paiement $paiement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paiement $paiement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paiement $paiement)
    {
        //
    }

    public function updateStatut(Request $request, $id)
    {
        $paiement = Paiement::findOrFail($id);

        if (!$paiement) {
            return response()->json([
                'success' => false,
                'message' => 'Paiement introuvable'
            ], 404);
        }

        $paiement->inscription_id = $request->inscription_id;
        $paiement->nombre_mois = $request->nombre_mois;
        $paiement->montant = $request->montant;
        $paiement->statut = $request->statut;

        $paiement->save();

        return response()->json([
            'message' => "Statut du paiement modifié avec succès",
            'paiement' => $paiement
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paiement $paiement)
    {
        //
    }
}
