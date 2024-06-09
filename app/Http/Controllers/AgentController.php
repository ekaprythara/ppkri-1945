<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $agents = Agent::latest()->get();
        return inertia("DataMaster/Agent", [
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
            "address" => "nullable",
            "email" => "nullable|unique:agents",
            "phone_number" => "nullable|unique:agents"
        ]);
        Agent::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Agent $agent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agent $agent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agent $agent, $id)
    {
        $data = $request->validate([
            "name" => "required",
            "address" => "nullable",
            "email" => [
                "nullable",
                Rule::unique('agents')->ignore($id),
            ],
            "phone_number" => [
                "nullable",
                Rule::unique('agents')->ignore($id),
            ]
        ]);

        Agent::where("id", $id)->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agent $agent)
    {
        //
    }
}
