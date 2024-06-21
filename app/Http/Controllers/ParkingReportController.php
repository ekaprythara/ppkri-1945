<?php

namespace App\Http\Controllers;

use App\Exports\ParkingExport;
use App\Models\Parking;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ParkingReportController extends Controller
{
    public function index()
    {
        $parking = Parking::all();
        $vehicleTypes = VehicleType::all();
        return inertia("Report/Parking", [
            "parking" => $parking,
            'vehicleTypes' => $vehicleTypes,
        ]);
    }

    public function print(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $parking = Parking::all()
            ->where('date', '>=', $from)
            ->where('date', '<=', $to)
            ->sortBy("date");;

        view()->share('parking', $parking);
        $pdf = Pdf::loadView('/export/parking-pdf')->setPaper('A4', 'portrait');
        return $pdf->stream();
    }

    public function export(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');
        $format = $request->input('format');

        if ($format == 'ods') {
            return (new ParkingExport($from, $to))->download('Laporan Parkir.ods', \Maatwebsite\Excel\Excel::ODS);
        } elseif ($format == 'pdf') {
            $parking = Parking::all()
                ->where('date', '>=', $from)
                ->where('date', '<=', $to)
                ->sortBy("date");

            view()->share('parking', $parking);
            $pdf = Pdf::loadView('/export/parking-pdf')->setPaper('A4', 'portrait');
            return $pdf->download("Laporan Parkir.pdf");
        } elseif ($format == 'xls') {
            return (new ParkingExport($from, $to))->download('Laporan Parkir.xls', \Maatwebsite\Excel\Excel::XLS);
        } elseif ($format == 'xlsx') {
            return (new ParkingExport($from, $to))->download('Laporan Parkir.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        }
    }
}
