<?php

namespace App\Http\Controllers;

use App\Models\ParkingGuest;
use App\Models\VehicleType;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\ParkingGuestExport;

class ParkingGuestReportController extends Controller
{
    public function index()
    {
        $parkingGuests = ParkingGuest::all();
        $vehicleTypes = VehicleType::all();
        return inertia("Report/ParkingGuestReport", [
            "parkingGuests" => $parkingGuests,
            'vehicleTypes' => $vehicleTypes,
        ]);
    }

    public function print(Request $request)
    {
        $from = $request->input('start');
        $to = $request->input('end');

        $parkingGuests = ParkingGuest::all()
            ->where('date', '>=', $from)
            ->where('date', '<=', $to);

        view()->share('parkingGuests', $parkingGuests);
        $pdf = Pdf::loadView('/export/parking-guest/pdf/parking-guest')->setPaper('A4', 'portrait');
        return $pdf->stream();
    }

    public function export(Request $request)
    {
        $from = $request->input('start');
        $to = $request->input('end');
        $format = $request->input('format');

        if ($format == 'ods') {
            return (new ParkingGuestExport($from, $to))->download('Laporan Parkir.ods', \Maatwebsite\Excel\Excel::ODS);
        } elseif ($format == 'pdf') {
            $from = $request->input('start');
            $to = $request->input('end');

            $parkingGuests = ParkingGuest::all()
                ->where('date', '>=', $from)
                ->where('date', '<=', $to)
                ->sortBy('date');

            view()->share('parkingGuests', $parkingGuests);
            $pdf = Pdf::loadView('/export/parking-guest/pdf/parking-guest')->setPaper('A4', 'portrait');
            return $pdf->download("Laporan Parkir.pdf");
        } elseif ($format == 'xls') {
            return (new ParkingGuestExport($from, $to))->download('Laporan Parkir.xls', \Maatwebsite\Excel\Excel::XLS);
        } elseif ($format == 'xlsx') {
            return (new ParkingGuestExport($from, $to))->download('Laporan Parkir.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        }
    }
}
