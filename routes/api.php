<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\location\ItemLocationController;
use App\Http\Controllers\location\MasterLocationController;
use App\Http\Controllers\location\PatrolLocationController;
use App\Http\Controllers\location\TaskLocationController;
use App\Http\Controllers\product\MasterProductController;
use App\Http\Controllers\product\ItemProductController;
use App\Http\Controllers\product\TaskProductController;
use App\Http\Controllers\product\PatrolProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('user')->group(function () {
    Route::get('/',[UserController::class,'getAll']);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register',[UserController::class, 'register']);
    Route::delete('/{id}',[UserController::class, 'delete']);
    Route::middleware(['api', 'prefix' => 'auth'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/{id}', [UserController::class, 'profile']);
    Route::post('/pwd/{id}',[UserController::class,'changepassword']);
    Route::post('/{id}',[UserController::class,'changeprofile']);
    });
});

Route::prefix('categories')->group(function(){
    Route::post('/',[CategoryController::class,'insert']);
    Route::get('/',[CategoryController::class,'getAll']);
    Route::get('/{id}',[CategoryController::class,'detail']);
    Route::delete('/{id}',[CategoryController::class,'delete']);
    Route::put('/{id}',[CategoryController::class,'update']);
});

Route::prefix('products')->group(function(){

    Route::prefix('master')->group(function(){
        Route::get('/',[MasterProductController::class,'getAll']);
        Route::post('/',[MasterProductController::class,'insert']);
        Route::get('/{id}',[MasterProductController::class,'detail']);
        Route::put('/{id}',[MasterProductController::class,'update']);
        Route::delete('/{id}',[MasterProductController::class,'delete']);
    });
    Route::prefix('item')->group(function(){
        Route::post('/',[ItemProductController::class,'insert']);
        Route::get('/',[ItemProductController::class,'getAll']);
        Route::get('/{id}',[ItemProductController::class,'detail']);
        Route::put('/{id}',[ItemProductController::class,'update']);
        Route::delete('/{id}',[ItemProductController::class,'delete']);
    });
    
    Route::prefix('task')->group(function(){
        Route::post('/',[TaskProductController::class,'insert']);
        Route::get('/',[TaskProductController::class,'getAll']);
        Route::get('/{id}',[TaskProductController::class,'detail']);
        Route::put('/{id}',[TaskProductController::class,'update']);
        Route::delete('/{id}',[TaskProductController::class,'delete']);
    });

    Route::prefix('patrol')->group(function(){
        Route::get('/',[PatrolProductController::class,'getAll']);
        Route::post('/',[PatrolProductController::class,'insert']);
        Route::get('/{id}',[PatrolProductController::class,'detail']);
        Route::put('/{id}',[PatrolProductController::class,'update']);
        Route::delete('/{id}',[PatrolProductController::class,'delete']);
    });

});

Route::prefix('locations')->group(function(){
    
    Route::prefix('master')->group(function(){
        Route::get('/',[MasterLocationController::class,'getAll']);
        Route::post('/',[MasterLocationController::class,'insert']);
        Route::get('/{id}',[MasterLocationController::class,'detail']);
        Route::put('/{id}',[MasterLocationController::class,'update']);
        Route::delete('/{id]',[MasterLocationController::class,'destroy']);
    });

    Route::prefix('item')->group(function(){
        Route::get('/',[ItemLocationController::class,'getAll']);
        Route::post('/',[ItemLocationController::class,'insert']);
        Route::get('/{id}',[ItemLocationController::class,'detail']);
        Route::put('/{id}',[ItemLocationController::class,'update']);
        Route::delete('/{id]',[ItemLocationController::class,'destroy']);
    });

    Route::prefix('task')->group(function(){
        Route::get('/',[TaskLocationController::class,'getAll']);
        Route::post('/',[TaskLocationController::class,'insert']);
        Route::get('/{id}',[TaskLocationController::class,'detail']);
        Route::put('/{id}',[TaskLocationController::class,'update']);
        Route::delete('/{id]',[TaskLocationController::class,'destroy']);
    });
    
    Route::prefix('patrol')->group(function(){
        Route::get('/',[PatrolLocationController::class,'getAll']);
        Route::post('/',[PatrolLocationController::class,'insert']);
        Route::get('/{id}',[PatrolLocationController::class,'detail']);
        Route::put('/{id}',[PatrolLocationController::class,'update']);
        Route::delete('/{id]',[PatrolLocationController::class,'destroy']);
    });
    
});