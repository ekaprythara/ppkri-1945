<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Guest;
use App\Models\ParkingGuest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $now = now()->toDateString();
        $currentMonth = date("m");
        $currentYear = date("Y");
        $lastYear = date("Y", strtotime("-1 year"));

        $agents = Agent::all();
        $totalGuestIncome = Guest::where("date", $now)->get()->sum('price');
        $totalParkingIncome = ParkingGuest::where("date", $now)->get()->sum('fee');
        $totalGuestInThisYear = Guest::whereRaw('YEAR(date) = ?', [$currentYear])->get();
        $totalGuestInLastYear = Guest::whereRaw('YEAR(date) = ?', [$lastYear])->get();
        $totalGuestInThisMonth = Guest::whereYear('date', $currentYear)
            ->whereMonth('date', $currentMonth)
            ->get();
        return Inertia::render("Dashboard", [
            "totalParkingIncome" => $totalParkingIncome,
            "totalGuestIncome" => $totalGuestIncome,
            "totalGuestInThisYear" => $totalGuestInThisYear,
            "totalGuestInLastYear" => $totalGuestInLastYear,
            "totalGuestInThisMonth" => $totalGuestInThisMonth,
            "agents" => $agents
        ]);
    }
}
