<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lesson = Lesson::all();

        return response()->json($lesson);
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
            "titre" => "required|string",
            "description" => "required|string",
            "duree" => "required",
            "cour_id" => "required|exists:cours,id"
        ]);

        $lesson = Lesson::create($validated);

        return response()->json([
            'message' => "Lesson crée avec succès",
            'lesson' => new LessonResource($lesson)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $lesson = Lesson::find($id);

        return response()->json($lesson);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $lesson = Lesson::find($id);

        $request->validate([
            "titre" => "required|string",
            "description" => "required|string",
            "duree" => "required",
        ]);

        $lesson->titre = $request->titre;
        $lesson->description = $request->description;
        $lesson->duree = $request->duree;

        $lesson->save();

        return response()->json([
            'message' => 'Leçon modifié avec succès',
            'lesson' => new LessonResource($lesson)
        ], 201);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $lesson = Lesson::find($id);

        $lesson->delete();

        return response()->json([
            'success' => true,
            'message' => 'Leçon supprimé avec succès'
        ]);
    }
}
