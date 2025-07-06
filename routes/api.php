<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\MatchesController;
use App\Http\Controllers\ScoresController;
use App\Http\Controllers\StandingsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\PhotosController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/users/login',[AuthController::class, 'login']);
Route::post('/users/register',[AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/users/logout',[AuthController::class, 'logout']);

    Route::apiResource('/schools', SchoolController::class);
    Route::apiResource('/teams', TeamController::class);
    Route::apiResource('/leagues', LeagueController::class);
    Route::apiResource('/matches', MatchesController::class);
    Route::apiResource('/scores', ScoresController::class);
    Route::apiResource('/standings', StandingsController::class);
    Route::apiResource('/categories', CategoriesController::class);
    Route::apiResource('/photos', PhotosController::class);

    Route::match(['put', 'post'], 'schools/{school}', [SchoolController::class, 'update']);
    Route::post('/standings/showTeamStandings', [StandingsController::class, 'showTeamStandings']);
    Route::post('/teams/getCategoryType', [TeamController::class , 'getCategoryType']);
    Route::post('/matches/showMatchesCategory', [MatchesController::class, 'showMatchesCategory']);
    Route::post('/standings/getStandingsCategory', [StandingsController::class, 'getStandingsCategory']);
    Route::match(['put', 'post'],'/categories/{category}', [CategoriesController::class, 'update']);
    Route::post('/leagues/getLeagueCategory', [LeagueController::class, 'getLeagueCategory']);
    Route::match(['put', 'post'],'/photos/{photo}', [PhotosController::class, 'update']);
    Route::get('/photos/getCategoryType/{category}', [PhotosController::class, 'getCategoryType']);
    Route::post('/matches/nextMatches', [MatchesController::class, 'nextMatches']);
 
});