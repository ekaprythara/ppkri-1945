<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\AgentGuest;
use App\Models\Parking;
use App\Models\RegularGuest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $now = now()->toDateString("en-CA");

        $currentYear = date("Y");
        $lastYear = date("Y", strtotime("-1 year"));


        // Total Guest Income Today
        $totalRegularGuestIncome = RegularGuest::where("date", $now)->get()->sum('price');
        $totalAgentGuestIncome = AgentGuest::where("date", $now)->get()->sum('price');
        $totalGuestIncome = $totalRegularGuestIncome + $totalAgentGuestIncome;

        // Total Parking Income Today
        $totalParkingIncome = Parking::where("date", $now)->get()->sum('fee');

        // Total Income
        $totalIncome = $totalGuestIncome + $totalParkingIncome;

        // Total Guest
        $totalRegularGuestInThisYear = RegularGuest::whereYear("date", "=", $currentYear)->get();
        $totalAgentGuestInThisYear = AgentGuest::whereYear("date", "=", $currentYear)->get();

        $totalRegularGuestInLastYear = RegularGuest::whereYear("date", "=", $lastYear)->get();
        $totalAgentGuestInLastYear = AgentGuest::whereYear("date", "=", $lastYear)->get();

        return Inertia::render("Dashboard", [
            "totalGuestIncome" => $totalGuestIncome,
            "totalParkingIncome" => $totalParkingIncome,
            "totalIncome" => $totalIncome,
            "totalRegularGuestInThisYear" => $totalRegularGuestInThisYear,
            "totalRegularGuestInLastYear" => $totalRegularGuestInLastYear,
            "totalAgentGuestInThisYear" => $totalAgentGuestInThisYear,
            "totalAgentGuestInLastYear" => $totalAgentGuestInLastYear,
        ]);
    }
}
