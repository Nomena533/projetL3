<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourController;
use App\Http\Controllers\Api\InscriptionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\InstrumentController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\LevelController;
use App\Http\Controllers\Api\ResourceController;

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
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/storeCour', [CourController::class, 'store']);

    Route::post('/niveau/{niveauId}/storeInscription', [InscriptionController::class, 'store']);
});

Route::get('/getRole', [RoleController::class, 'index']);

Route::get('/getCour', [CourController::class, 'index']);
Route::get('/getCourDetail/{id}', [CourController::class, 'show']);
Route::put('/updateCour/{id}', [CourController::class, 'update']);
Route::put('/updateStatutCour/{id}', [CourController::class, 'updateStatut']);
Route::delete('/deleteCour/{id}', [CourController::class, 'destroy']);

Route::get('/getInstrument', [InstrumentController::class, 'index']);
Route::post('/storeInstrument', [InstrumentController::class, 'store']);

Route::get('/getLevel', [LevelController::class, 'index']);
Route::post('/storeLevel', [LevelController::class, 'store']);

Route::post('/cour/{courId}/storeLesson', [LessonController::class, 'store']);
Route::get('/getLesson', [LessonController::class, 'index']);
Route::get('/getLessonDetail/{id}', [LessonController::class, 'show']);
Route::put('/updateLesson/{id}', [LessonController::class, 'update']);
Route::delete('/deleteLesson/{id}', [LessonController::class, 'destroy']);

Route::post('/lesson/{lessonId}/storeResource', [ResourceController::class, 'store']);
Route::get('/getResource', [ResourceController::class, 'index']);
Route::get('/getResourceDetail/{id}', [ResourceController::class, 'show']);
Route::put('/updateResource/{id}', [ResourceController::class, 'update']);
Route::delete('/deleteResource/{id}', [ResourceController::class, 'destroy']);

Route::get('/getInscription', [InscriptionController::class, 'index']);
Route::get('/getInscriptionDetail/{id}', [InscriptionController::class, 'show']);
Route::put('/updateStatutInscription/{id}', [InscriptionController::class, 'updateStatut']);

