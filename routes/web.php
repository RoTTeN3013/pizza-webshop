<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PizzaController;
use App\Http\Controllers\CartController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/pizzas', [PizzaController::class, 'index']);
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::get('/cart', [CartController::class, 'showCart']);
Route::post('/update-cart', [CartController::class, 'updateCart']);