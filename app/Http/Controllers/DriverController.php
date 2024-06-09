<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $drivers = Driver::latest()->get();
        $agents = Agent::all();
        return inertia("DataMaster/Driver", [
            "drivers" => $drivers,
            "agents" => $agents
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
        $data = $request->validate([
            "name" => "required",
            "phone_number" => "nullable|unique:drivers",
            "agent_id" => "required",
        ]);
        Driver::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Driver $driver)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Driver $driver, $id)
    {
        $data = $request->validate([
            "name" => "required",
            "phone_number" => [
                "nullable",
                Rule::unique('drivers')->ignore($id),
            ],
            "agent_id" => "required"
        ]);

        Driver::where("id", $id)->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        //
    }
}
