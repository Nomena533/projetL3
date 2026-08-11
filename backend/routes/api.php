<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;

/*
|--------------------------------------------------------------------------
| Routes publiques
|--------------------------------------------------------------------------
| Ces routes sont accessibles sans être connecté.
*/

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Routes protégées
|--------------------------------------------------------------------------
| Ces routes nécessitent un token Sanctum valide.
*/

Route::middleware('auth:sanctum')->group(function () {

    // Récupérer le profil de l'utilisateur connecté
    Route::get('/profile', [AuthController::class, 'profile']);

    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

});

Route::get('getRoles', [RoleController::class, 'index']);