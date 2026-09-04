<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourResource;
use App\Models\Cour;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cour = Cour::with('instrument')->with('level')->with('prof')->get();
        $courBrouillon = Cour::with('instrument')->with('level')->with('prof')->where("statut", "brouillon")->get();

        return response()->json([
            "all" => $cour, 
            "brouillon"=> $courBrouillon
        ]);
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
            "niveau_id" => 'required|exists:levels,id',
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
        $lesson = Lesson::where("cour_id", $id)->orderBy('created_at','ASC')->get();

        return response()->json([
            "cour" => $cour, 
            "lesson" => $lesson
        ]);
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
    public function update(Request $request, $id)
    {
        $cour = Cour::find($id);

        if (!$cour) {
            return response()->json([
                'success' => false,
                'message' => 'Cours introuvable'
            ], 404);
        }

        $request->validate([
            "instrument_id" => 'required|exists:instruments,id',
            "niveau_id" => 'required|exists:levels,id',
            "titre" => 'required|string',
            "description" => 'required|string',
            "prix" => 'required',

            // mimes : extension autorisé pour l'insertion d'image
            "image" => 'nullable|image|mimes:jpg,jpeg,png,webp',
            "duree" => 'required'
        ]);

        $cour->instrument_id = $request->instrument_id;
        $cour->niveau_id = $request->niveau_id;
        $cour->titre = $request->titre;
        $cour->description = $request->description;
        $cour->prix = $request->prix;
        $cour->duree = $request->duree;

        // Vérifie si une image a été envoyé
        if ($request->hasFile('image')) {
            // supprime l'ancienne image 
            if ($cour->image) {
                Storage::disk("public")->delete($cour->image);
            }

            // Store le fichier dans Storage/app/public/cours
            $path = $request->file('image')->store('cours', 'public');

            $cour->image = $path;
        }

        $cour->save();

        return response()->json([
            'message' => 'Cour modifié avec succès',
            'cour' => new CourResource($cour)
        ], 201);
    }

    public function updateStatut(Request $request, $id)
    {
        // dd($request, $id);
        $cour = Cour::findOrFail($id);

        if (!$cour) {
            return response()->json([
                'success' => false,
                'message' => 'Cours introuvable'
            ], 404);
        }

        $cour->instrument_id = $request->instrument_id;
        $cour->niveau_id = $request->niveau_id;
        $cour->titre = $request->titre;
        $cour->description = $request->description;
        $cour->prix = $request->prix;
        $cour->duree = $request->duree;
        $cour->statut = $request->statut;

        $cour->save();

        return response()->json([
            'message' => 'Statut du cour modifié avec succès',
            'cour' => new CourResource($cour)
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cour = Cour::find($id);

        if ($cour->image) {
            Storage::disk("public")->delete($cour->image);
        }
        $cour->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cours supprimé avec succès'
        ]);
    }
}
