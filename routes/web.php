<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PizzaController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/pizzas', [PizzaController::class, 'index']);
Route::post('/add-to-cart', [CartController::class, 'addToCart']);
Route::post('/add-to-cart-confirm', [CartController::class, 'addToCartConfirm']);
Route::get('/cart', [CartController::class, 'showCart']);
Route::post('/update-cart', [CartController::class, 'updateCart']);
Route::get('/contact', [ContactController::class, 'index']);
Route::post('/send-contact-email', [ContactController::class, 'sendContactEmail']);
Route::get('/order-confirmation', [OrderController::class, 'index']);
Route::post('/confirm-order', [OrderController::class, 'confirmOrder']);
Route::get('/confirm-page', [OrderController::class, 'showConfirmPage']);