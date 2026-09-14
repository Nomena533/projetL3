<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercice;
use App\Models\Lesson;
use Illuminate\Http\Request;

class ExerciceController extends Controller
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
    public function store(Request $request, $lessonId)
    {
        $validated = $request->validate([
            "titre" => "required|string",
            "description" => "required|string"
        ]);

        $lesson = Lesson::findOrFail($lessonId);

        $validated['lesson_id'] = $lesson->id;

        $exercice = Exercice::create($validated);

        return response()->json([
            'message' => "Exercice crée avec succès",
            'exercice' => $exercice
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exercice $exercice)
    {
        //
    }

    public function getByLesson($lessonId)
    {
        $exercice = Exercice::where("lesson_id", $lessonId)->get();

        return response()->json($exercice);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exercice $exercice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $exercice = Exercice::find($id);

        $exercice->titre = $request->titre;
        $exercice->description = $request->description;

        $exercice->save();

        return response()->json([
            'message' => 'Exercice modifiée avec succès',
            'exercice' => $exercice
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercice $exercice)
    {
        //
    }
}
