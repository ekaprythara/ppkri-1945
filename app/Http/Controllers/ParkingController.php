<?php

namespace App\Http\Controllers;

use App\Models\Parking;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class ParkingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $parking = Parking::all();
        $vehicleTypes = VehicleType::all();
        return inertia("Transaction/Parking", [
            "parking" => $parking,
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
        $isCustomFee = $request->input("isCustomFee");

        if ($isCustomFee) {
            $data = $request->validate([
                "date" => "required|date",
                "vehicleType_id" => "required",
                "count" => "required",
                "isCustomFee" => "boolean",
                "fee" => "required",
                "description" => "nullable"
            ]);
            Parking::create($data);
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
            Parking::create($data);
            // dd($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Parking $parking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Parking $parking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Parking $parking, $id)
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
            Parking::where("id", $id)->update($data);
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
            Parking::where("id", $id)->update($data);
            // dd($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parking $parking, $id)
    {
        Parking::destroy($id);
    }
}
