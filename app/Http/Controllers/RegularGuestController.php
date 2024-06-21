<?php

namespace App\Http\Controllers;

use App\Models\RegularGuest;
use Illuminate\Http\Request;

class RegularGuestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $regularGuests = RegularGuest::all();
        return inertia("Transaction/RegularGuest", [
            "regularGuests" => $regularGuests
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
        $isCustomPrice = $request->input('isCustomPrice');
        if ($isCustomPrice) {
            $data = [
                "date" => $request->input("date"),
                "name" => $request->input("name"),
                "count" =>  $request->input("count"),
                "price" => $price = $request->input("price"),
                "isCustomPrice" => true,
                "description" => $request->input("description"),
            ];
            RegularGuest::create($data);
        } else {
            $count = $request->input("count");
            $price = 40000;

            $totalPrice = intVal($price) * intVal($count);

            $data = [
                "date" => $request->input("date"),
                "name" => $request->input("name"),
                "count" =>  $request->input("count"),
                "price" => $totalPrice,
                "isCustomPrice" => false,
                "description" => $request->input("description"),
            ];
            RegularGuest::create($data);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(RegularGuest $regularGuest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RegularGuest $regularGuest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $isCustomPrice = $request->input('isCustomPrice');
        if ($isCustomPrice) {
            $data = [
                "date" => $request->input("date"),
                "name" => $request->input("name"),
                "count" =>  $request->input("count"),
                "price" => $request->input('price'),
                "isCustomPrice" => true,
                "description" => $request->input("description"),
            ];
            RegularGuest::where("id", $id)->update($data);
        } else {
            $count = $request->input("count");
            $price = 40000;

            $totalPrice = intVal($price) * intVal($count);

            $data = [
                "date" => $request->input("date"),
                "name" => $request->input("name"),
                "count" =>  $request->input("count"),
                "price" => $totalPrice,
                "isCustomPrice" => false,
                "description" => $request->input("description"),
            ];
            RegularGuest::where("id", $id)->update($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        RegularGuest::destroy($id);
    }
}
