<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inscription;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userListInscription(Request $request, $userId) {
        // // Récupère l'id de l'user connecté
        // $userId = $request->user()->id;
        // dd($userId);

        $inscription = Inscription::where("user_id", $userId)->with("level")->with("instruments")->get();
        // $inscription_instrument = Inscription::with("instruments")->get();
        // return response()->json([$inscription, $inscription_instrument]);
        return response()->json($inscription);
    }

}
