<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Driver;
use App\Models\Guest;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;


class GuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $guests = Guest::latest("date")->get();
        $agents = Agent::all();
        $tickets = Ticket::all();
        $drivers = Driver::all();
        return inertia("Transaction/Guest", [
            "guests" => $guests,
            "agents" => $agents,
            "tickets" => $tickets,
            "drivers" => $drivers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if ($request->input("isCustomPrice") === true) {
            $data = [
                "date" => $request->input("date"),
                "agent_id" => $request->input("agent_id"),
                "driver_id" =>  $request->input("driver_id"),
                "count" => $request->input("count"),
                "ticket_id" => $request->input("ticket_id"),
                "isCustomPrice" => $request->input("isCustomPrice"),
                "price" => $request->input("price"),
                "description" => $request->input("description"),
            ];
            // dd($data);
            Guest::create($data);
        } else if ($request->input("isCustomPrice") === false) {
            $price = Ticket::where("id", 1)->value("price");
            $count = $request->input("count");
            $data = [
                "date" => $request->input("date"),
                "agent_id" => 1,
                "driver_id" => 1,
                "count" => $request->input("count"),
                "ticket_id" => $request->input("ticket_id"),
                "isCustomPrice" => $request->input("isCustomPrice"),
                "price" => intVal($price) * intVal($count),
                "description" => $request->input("description"),
            ];
            // dd($data);
            // Guest::create($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Guest $guest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Guest $guest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guest $guest)
    {
        //
    }
}
