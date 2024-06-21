<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AgentGuestController;
use App\Http\Controllers\AgentGuestReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\ParkingController;
use App\Http\Controllers\ParkingReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegularGuestController;
use App\Http\Controllers\RegularGuestReportController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VehicleTypeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//! Guest Routes
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get("/collections", function () {
    return Inertia::render("Collections");
});
Route::get("/gallery", function () {
    return Inertia::render("Gallery");
});
Route::get("/ticket", function () {
    return Inertia::render("Ticket");
});
Route::get("/about", function () {
    return Inertia::render("About");
});
Route::get("/contact", function () {
    return Inertia::render("Contact");
});

//! Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/register', [UserController::class, 'store'])
        ->middleware(['auth', 'verified'])->name('register');

    Route::get('/dashboard', [DashboardController::class, "index"])->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/user', [UserController::class, 'index'], function () {
        return Inertia::render('User');
    })->middleware(['auth', 'verified'])->name('user');

    //! Master Data Routes
    Route::get("/master-data/vehicle-type", [VehicleTypeController::class, "index"]);
    Route::post("/master-data/vehicle-type", [VehicleTypeController::class, "store"]);
    Route::patch("/master-data/vehicle-type/{id}", [VehicleTypeController::class, "update"]);

    Route::get("/master-data/agent", [AgentController::class, "index"]);
    Route::post("/master-data/agent", [AgentController::class, "store"]);
    Route::patch("/master-data/agent/{id}", [AgentController::class, "update"]);

    Route::get("/master-data/driver", [DriverController::class, "index"]);
    Route::post("/master-data/driver", [DriverController::class, "store"]);
    Route::patch("/master-data/driver/{id}", [DriverController::class, "update"]);

    Route::get("/master-data/ticket", [TicketController::class, "index"]);
    Route::post("/master-data/ticket", [TicketController::class, "store"]);
    Route::patch("/master-data/ticket/{id}", [TicketController::class, "update"]);

    Route::get("/master-data/facility", [FacilityController::class, "index"]);
    Route::post("/master-data/facility", [FacilityController::class, "store"]);
    Route::patch("/master-data/facility/{id}", [FacilityController::class, "update"]);

    //! Transaction Routes
    Route::get("/transaksi/parkir", [ParkingController::class, "index"]);
    Route::post("/transaksi/parkir", [ParkingController::class, "store"]);
    Route::patch("/transaksi/parkir/{id}", [ParkingController::class, "update"]);
    Route::delete("/transaksi/parkir/{id}/delete", [ParkingController::class, "destroy"]);

    Route::get("/transaksi/tamu-reguler", [RegularGuestController::class, "index"]);
    Route::post("/transaksi/tamu-reguler", [RegularGuestController::class, "store"]);
    Route::patch("/transaksi/tamu-reguler/{id}", [RegularGuestController::class, "update"]);
    Route::delete("/transaksi/tamu-reguler/{id}/delete", [RegularGuestController::class, "destroy"]);

    Route::get("/transaksi/tamu-agen", [AgentGuestController::class, "index"]);
    Route::post("/transaksi/tamu-agen", [AgentGuestController::class, "store"]);
    Route::patch("/transaksi/tamu-agen/{id}", [AgentGuestController::class, "update"]);
    Route::delete("/transaksi/tamu-agen/{id}/delete", [AgentGuestController::class, "destroy"]);

    // ! Report Routes
    Route::get("/laporan/parkir", [ParkingReportController::class, "index"]);
    Route::get("/laporan/parkir/cetak", [ParkingReportController::class, "print"]);
    Route::get("/laporan/parkir/ekspor", [ParkingReportController::class, "export"]);

    Route::get("/laporan/tamu-reguler", [RegularGuestReportController::class, "index"]);
    Route::get("/laporan/tamu-reguler/cetak", [RegularGuestReportController::class, "print"]);
    Route::get("/laporan/tamu-reguler/ekspor", [RegularGuestReportController::class, "export"]);

    Route::get("/laporan/tamu-agen", [AgentGuestReportController::class, "index"]);
    Route::get("/laporan/tamu-agen/cetak", [AgentGuestReportController::class, "print"]);
    Route::get("/laporan/tamu-agen/ekspor", [AgentGuestReportController::class, "export"]);
});

require __DIR__ . '/auth.php';
