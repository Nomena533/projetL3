<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LevelResource;
use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = Level::all();

        return response()->json($levels);
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
        $request->validate([
            "name" => "required|string",
            "description" => "required|string",
            "duree" => "required|string",
            "prix" => "required"

        ]);

        $Level = Level::create([
            "name" => $request->name,
            "description" => $request->description,
            "duree" => $request->duree,
            "prix" => $request->prix
        ]);

        return response()->json([
            'message' => 'Level créé avec succès',
            'Level' => new LevelResource($Level)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Level $Level)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Level $Level)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Level $Level)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Level $Level)
    {
        //
    }
}
