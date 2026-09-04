<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResourceResource;
use App\Models\Lesson;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resource = Resource::all();

        return response()->json($resource);
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
    public function store(Request $request, $lessonId)
    {
        
        // 1. Validation des données envoyées par React
        $validated = $request->validate([
            "ressources" => "required|array|min:1",

            "ressources.*.titre" => "required|string",
            "ressources.*.type" => "required|in:video,audio,pdf",
            "ressources.*.fichier" => "required|file",
        ]);

        // 2. Vérifie que la leçon existe
        $lesson = Lesson::findOrFail($lessonId);

        // 3. Tableau qui contiendra les ressources créées
        $ressources = [];

        // 4. Parcourt chaque ressource envoyée
        foreach ($validated["ressources"] as $index => $ressourceData) {

            $file = $request->file("ressources.{$index}.fichier");

            
            if (!$file) {
                continue;
            }

            $path = $file->store("ressources", "public");

            // 5. Stocke le fichier dans Storage/app/public/ressources
            $ressourceData["fichier"] = $path;

            // 6. Ajoute automatiquement l'id de la leçon
            $ressourceData["lesson_id"] = $lesson->id;


            // 7. Crée la ressource dans la base de données
            $ressource = Resource::create($ressourceData);

            // 8. Conserve la ressource créée pour la réponse JSON
            $ressources[] = $ressource;
        }
        

        
        // 9. Retourne une réponse JSON
        return response()->json([
            "message" => "Ressources créées avec succès",
            "ressources" => ResourceResource::collection($ressources),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $resource = Resource::find($id);

        return response()->json($resource);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resource $resource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $resource = Resource::findOrFail($id);

        if (!$resource) {
            return response()->json([
                'success' => false,
                'message' => 'Resources introuvable'
            ], 404);
        }

        // 1. Validation des données envoyées par React
        $request->validate([
            "titre" => "required|string",
            "type" => "required|in:video,audio,pdf",
            "fichier" => "file",
        ]);

        $resource->titre = $request->titre;
        $resource->type = $request->type;

        // Vérifie si une image a été envoyé
        if ($request->hasFile('fichier')) {
            // supprime l'ancienne image 
            if ($resource->fichier) {
                Storage::disk("public")->delete($resource->fichier);
            }

            // Store le fichier dans Storage/app/public/ressources
            $path = $request->file('fichier')->store("ressources", "public");

            $resource->fichier = $path;
        }

        $resource->save();

        return response()->json([
            'message' => 'Resource modifié avec succès',
            'cour' => new ResourceResource($resource)
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $resource = Resource::find($id);

        if ($resource->fichier) {
            Storage::disk("public")->delete($resource->fichier);
        }

        $resource->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ressource supprimé avec succès'
        ]);
    }
}
