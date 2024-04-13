<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\location\ItemLocationController;
use App\Http\Controllers\location\MasterLocationController;
use App\Http\Controllers\location\PatrolLocationController;
use App\Http\Controllers\location\TaskLocationController;
use App\Http\Controllers\product\ProductController;
use App\Http\Controllers\product\ItemController;
use App\Http\Controllers\product\TaskController;
use App\Http\Controllers\product\PatrolController;
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
    Route::get('/{id}', [UserController::class, 'profile']);
    Route::post('/pwd/{id}',[UserController::class,'changepassword']);
    Route::post('/{id}',[UserController::class,'changeprofile']);
    Route::post('/logout', [UserController::class, 'logout']);
    });
});

Route::prefix('categories')->group(function(){
    Route::post('/',[CategoryController::class,'insert']);
    Route::get('/',[CategoryController::class,'getAll']);
    Route::put('/{id}',[CategoryController::class,'update']);
    Route::delete('/{id}',[CategoryController::class,'delete']);
});

Route::prefix('products')->group(function(){

    Route::prefix('master')->group(function(){
        Route::get('/',[ProductController::class,'getAll']);
        Route::post('/',[ProductController::class,'insert']);
        Route::get('/{id}',[ProductController::class,'detail']);
        Route::put('/{id}',[ProductController::class,'update']);
        Route::delete('/{id}',[ProductController::class,'delete']);
    });
    Route::prefix('item')->group(function(){
        Route::post('/',[ItemController::class,'insert']);
        Route::get('/',[ItemController::class,'getAll']);
        Route::get('/{id}',[ItemController::class,'detail']);
        Route::put('/{id}',[ItemController::class,'update']);
        Route::delete('/{id}',[ItemController::class,'delete']);
    });
    
    Route::prefix('task')->group(function(){
        Route::post('/',[TaskController::class,'insert']);
        Route::get('/',[TaskController::class,'getAll']);
        Route::get('/{id}',[TaskController::class,'detail']);
        Route::put('/{id}',[TaskController::class,'update']);
        Route::delete('/{id}',[TaskController::class,'delete']);
    });

    Route::prefix('patrol')->group(function(){
        Route::get('/',[PatrolController::class,'getAll']);
        Route::post('/',[PatrolController::class,'insert']);
        Route::get('/{id}',[PatrolController::class,'detail']);
        Route::put('/{id}',[PatrolController::class,'update']);
        Route::delete('/{id}',[PatrolController::class,'delete']);
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