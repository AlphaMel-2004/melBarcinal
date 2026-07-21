<?php

use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\SiteSettingsController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('projects/{project}', [PortfolioController::class, 'show'])->name('projects.show');
Route::post('contact', [ContactMessageController::class, 'store'])->middleware('throttle:contact')->name('contact.store');
Route::get('sitemap.xml', [PortfolioController::class, 'sitemap'])->name('sitemap');

Route::redirect('dashboard', '/admin/dashboard')->middleware(['auth', 'owner'])->name('dashboard');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'owner'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('projects', AdminProjectController::class)->except('show');
    Route::get('settings', [SiteSettingsController::class, 'edit'])->name('settings.edit');
    Route::post('settings', [SiteSettingsController::class, 'update'])->name('settings.update');
    Route::get('messages', [AdminContactMessageController::class, 'index'])->name('messages.index');
    Route::patch('messages/{message}', [AdminContactMessageController::class, 'update'])->name('messages.update');
    Route::delete('messages/{message}', [AdminContactMessageController::class, 'destroy'])->name('messages.destroy');
});

require __DIR__.'/settings.php';
