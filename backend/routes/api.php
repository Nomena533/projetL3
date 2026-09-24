<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourController;
use App\Http\Controllers\Api\ExerciceController;
use App\Http\Controllers\Api\InscriptionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\InstrumentController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\LevelController;
use App\Http\Controllers\Api\PaiementController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MessagesController;
use App\Http\Controllers\Api\SoumissionController;
use App\Http\Controllers\NotificationController;

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
    Route::get('/updateProfile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/getCour', [CourController::class, 'index']);
    Route::post('/storeCour', [CourController::class, 'store']);

    Route::post('/niveau/{niveauId}/storeInscription', [InscriptionController::class, 'store']);

    Route::post("/storeMessage", [MessagesController::class, 'store']);
    Route::get("/getMessage", [MessagesController::class, 'index']);
    // Ouvre une conversation et réinitialise son compteur de messages non lus.
    Route::post("/messages/{otherUserId}/read", [MessagesController::class, 'markAsRead']);

    Route::post("/exercice/{exerciceId}/storeSoumission", [SoumissionController::class, 'store']);

    Route::name("notification")->controller(NotificationController::class)->group(function () {
        Route::get('/getNotification', 'index');
    });
});

Route::name("user")->controller(UserController::class)->group(function () {
    Route::get('/getUsers', 'index');
    Route::get('/user/{userId}/userListInscription', 'userListInscription');
});

Route::get('/getRole', [RoleController::class, 'index']);

Route::name("cour")->controller(CourController::class)->group(function () {
    Route::get('/getCourDetail/{id}', 'show');
    Route::put('/updateCour/{id}', 'update');
    Route::put('/updateStatutCour/{id}', 'updateStatut');
    Route::delete('/deleteCour/{id}', 'destroy');
});

Route::name("instrument")->controller(InstrumentController::class)->group(function () {
    Route::get('/getInstrument', 'index');
    Route::post('/storeInstrument', 'store');
});

Route::name("level")->controller(LevelController::class)->group(function () {
    Route::get('/getLevel', 'index');
    Route::post('/storeLevel', 'store');
});

Route::name("lesson")->controller(LessonController::class)->group(function () {
    Route::post('/cour/{courId}/storeLesson', 'store');
    Route::get('/getLesson', 'index');
    Route::get('/getLessonByCour/{courId}', 'getByCour');
    Route::get('/getLessonDetail/{id}', 'show');
    Route::put('/updateLesson/{id}', 'update');
    Route::delete('/deleteLesson/{id}', 'destroy');
});

Route::name("exercice")->controller(ExerciceController::class)->group(function () {
    Route::post('/lesson/{lessonId}/storeExercice', 'store');
    Route::get('/getExercice', 'index');
    Route::get('/getExerciceByLesson/{lessonId}', 'getByLesson');
    // Route::get('/getLessonDetail/{id}', 'show');
    Route::put('/updateExercice/{id}', 'update');
    // Route::delete('/deleteLesson/{id}', 'destroy');
});

Route::name("resource")->controller(ResourceController::class)->group(function () {
    Route::post('/lesson/{lessonId}/storeResource', 'store');
    Route::get('/getResource', 'index');
    Route::get('/getResourceDetail/{id}', 'show');
    Route::get('/getResourceByLesson/{lessonId}', 'getByLesson');
    Route::put('/updateResource/{id}', 'update');
    Route::delete('/deleteResource/{id}', 'destroy');
});


Route::name("inscription")->controller(InscriptionController::class)->group(function () {
    Route::get('/getInscription', 'index');
    Route::get('/getInscriptionDetail/{id}', 'show');
    Route::put('/updateStatutInscription/{id}', 'updateStatut');
});

Route::name("paiement")->controller(PaiementController::class)->group(function () {
    Route::post('/inscription/{inscriptionId}/storePaiement', 'store');
    Route::get('/getPaiement', 'index');
    Route::get('/getPaimentDetail/{id}', 'show');
    Route::put('/updateStatutPaiement/{id}', 'updateStatut');
    // Route::put('/updateResource/{id}', 'update');
    // Route::delete('/deleteResource/{id}', 'destroy');
});

Route::name("soumission")->controller(SoumissionController::class)->group(function () {
    Route::get('/getSoumission', 'index');
    // patch modifie seulement les valeurs envoyé sans touché au reste dans la BDD contrairement à put qui modifie tout les valeurs dans la BDD
    Route::patch('/updateNoteSoumission/{id}', 'updateNoteSoumission');
});
