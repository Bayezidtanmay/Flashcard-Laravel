<?php

use App\Http\Controllers\NameController;
use Illuminate\Support\Facades\Route;

// Route to show the list of name and color entries
Route::get('/blade', [NameController::class, 'index'])->name('name.index');

// Route to store a new name and color entry
Route::post('/store', [NameController::class, 'store'])->name('name.store');

// Route to edit a name and color entry
Route::get('/edit/{id}', [NameController::class, 'edit'])->name('name.edit');
Route::delete('/delete/{id}', [NameController::class, 'delete'])->name('name.delete');

// Route to update an existing name and color entry
Route::patch('/update/{id}', [NameController::class, 'update'])->name('name.update');


// React SPA

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');
