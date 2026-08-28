<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourResource;
use App\Models\Cour;
use Illuminate\Http\Request;

class CourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cour = Cour::with('instrument')->get();

        return response()->json($cour);
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            "instrument_id" => 'required|exists:instruments,id',
            "titre" => 'required|string',
            "description" => 'required|string',
            "prix" => 'required',

            // mimes : extension autorisé pour l'insertion d'image
            "image" => 'nullable|image|mimes:jpg,jpeg,png,webp',
            "duree" => 'required'
        ]);

        // Récupère l'id de l'user connecté
        $validated['prof_id'] = $request->user()->id;

        // Vérifie si une image a été envoyé
        if ($request->hasFile('image')) {
            // Store le fichier dans Storage/app/public/cours
            $validated['image'] = $request->file('image')->store('cours', 'public');
        }

        $cour = Cour::create($validated);

        return response()->json([
            'message' => 'Cour créé avec succès',
            'cour' => new CourResource($cour)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cour = Cour::with("instrument")->find($id);

        return response()->json($cour);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cour $cour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cour $cour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cour $cour)
    {
        //
    }
}
