<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\InstrumentController;

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

    
    Route::post('/storeCour', [CourController::class, 'store']);
});

Route::get('/getRole', [RoleController::class, 'index']);

Route::get('/getCour', [CourController::class, 'index']);
Route::get('/getCourDetail/{id}', [CourController::class, 'show']);
Route::put('/updateCour/{id}', [CourController::class, 'update']);
Route::delete('/deleteCour/{id}', [CourController::class, 'destroy']);

Route::get('/getInstrument', [InstrumentController::class, 'index']);
Route::post('/storeInstrument', [InstrumentController::class, 'store']);
