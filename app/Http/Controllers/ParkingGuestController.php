<?php

namespace App\Http\Controllers;

use App\Models\ParkingGuest;
use App\Models\VehicleType;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ParkingGuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parkingGuests = ParkingGuest::all();
        $vehicleTypes = VehicleType::all();
        return inertia("Transaction/ParkingGuest", [
            "parkingGuests" => $parkingGuests,
            'vehicleTypes' => $vehicleTypes,
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
        if ($request->input("isCustomFee")) {
            $data = $request->validate([
                "date" => "required|date",
                "vehicleType_id" => "required",
                "count" => "required",
                "isCustomFee" => "boolean",
                "fee" => "required",
                "description" => "nullable"
            ]);
            ParkingGuest::create($data);
            // dd($data);
        } else {
            $fee = VehicleType::where("id", $request->input("vehicleType_id"))->value("fee");
            $count = $request->input("count");
            $data = [
                "date" => $request->input("date"),
                "vehicleType_id" => $request->input("vehicleType_id"),
                "count" => $request->input("count"),
                "isCustomFee" => false,
                "fee" => intVal($fee) * intVal($count),
                "description" => $request->input("description")
            ];
            ParkingGuest::create($data);
            // dd($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ParkingGuest $parkingGuest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ParkingGuest $parkingGuest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ParkingGuest $parkingGuest, $id)
    {
        if ($request->input("isCustomFee")) {
            $data = $request->validate([
                "date" => "required|date",
                "vehicleType_id" => "required",
                "count" => "required",
                "isCustomFee" => "boolean",
                "fee" => "required",
                "description" => "nullable"
            ]);
            ParkingGuest::where("id", $id)->update($data);
            // dd($data);
        } else {
            $fee = VehicleType::where("id", $request->input("vehicleType_id"))->value("fee");
            $count = $request->input("count");
            $data = [
                "date" => $request->input("date"),
                "vehicleType_id" => $request->input("vehicleType_id"),
                "count" => $request->input("count"),
                "isCustomFee" => false,
                "fee" => intVal($fee) * intVal($count),
                "description" => $request->input("description")
            ];
            ParkingGuest::where("id", $id)->update($data);
            // dd($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ParkingGuest $parkingGuest)
    {
        //
    }
}
