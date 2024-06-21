<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\AgentGuest;
use App\Models\Driver;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;


class AgentGuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $agentGuests = AgentGuest::latest("date")->with("driver.agent")->get();
        $agentHasDriver = Driver::with('agent')->get();
        $tickets = Ticket::all();
        $drivers = Driver::all();
        return inertia("Transaction/AgentGuest", [
            "agentGuests" => $agentGuests,
            "agentHasDriver" => $agentHasDriver,
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
        $isCustomPrice = $request->input("isCustomPrice");

        if ($isCustomPrice) {
            $data = [
                "date" => $request->input("date"),
                "driver_id" =>  $request->input("driver_id"),
                "count" => $request->input("count"),
                "ticket_id" => null,
                "isCustomPrice" => $request->input("isCustomPrice"),
                "price" => $request->input("price"),
                "description" => $request->input("description"),
            ];
            // dd($data);
            AgentGuest::create($data);
        } else if ($isCustomPrice == false) {
            $ticket_id = $request->input("ticket_id");
            $price = Ticket::where("id", $ticket_id)->value("price");
            $count = $request->input("count");

            $totalPrice = intVal($price) * intVal($count);

            $data = [
                "date" => $request->input("date"),
                "driver_id" =>  $request->input("driver_id"),
                "count" => $count,
                "ticket_id" => $ticket_id,
                "isCustomPrice" => $request->input("isCustomPrice"),
                "price" =>  $totalPrice,
                "description" => $request->input("description"),
            ];
            // dd($data);
            AgentGuest::create($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AgentGuest $agentGuest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AgentGuest $agentGuest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AgentGuest $agentGuest, $id)
    {
        $isCustomPrice = $request->input("isCustomPrice");

        if ($isCustomPrice) {
            $data = [
                "date" => $request->input("date"),
                "driver_id" =>  $request->input("driver_id"),
                "count" => $request->input("count"),
                "ticket_id" => null,
                "isCustomPrice" => $request->input("isCustomPrice"),
                "price" => $request->input("price"),
                "description" => $request->input("description"),
            ];
            // dd($data);
            AgentGuest::where("id", $id)->update($data);
        } else if ($isCustomPrice == false) {
            $ticket_id = $request->input("ticket_id");
            $price = Ticket::where("id", $ticket_id)->value("price");
            $count = $request->input("count");

            $totalPrice = intVal($price) * intVal($count);

            $data = [
                "date" => $request->input("date"),
                "driver_id" =>  $request->input("driver_id"),
                "count" => $count,
                "ticket_id" => $ticket_id,
                "isCustomPrice" => $request->input("isCustomPrice"),
                "price" =>  $totalPrice,
                "description" => $request->input("description"),
            ];
            // dd($data);
            AgentGuest::where("id", $id)->update($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        AgentGuest::destroy($id);
    }
}
