<?php

namespace App\Http\Controllers;

use App\Models\RegularGuest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use App\Exports\RegularGuestExport;

class RegularGuestReportController extends Controller
{
    public function index()
    {
        $regularGuests = RegularGuest::all();
        return inertia("Report/RegularGuest", [
            "regularGuests" => $regularGuests,
        ]);
    }

    public function print(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');

        $regularGuests = RegularGuest::all()
            ->where('date', '>=', $from)
            ->where('date', '<=', $to)
            ->sortBy('date');

        view()->share('regularGuests', $regularGuests);
        $pdf = Pdf::loadView('/export/regular-guest')->setPaper('A4', 'portrait');
        return $pdf->stream();
    }

    public function export(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');
        $format = $request->input('format');

        if ($format == 'ods') {
            return (new RegularGuestExport($from, $to))->download('Laporan Tamu Reguler.ods', \Maatwebsite\Excel\Excel::ODS);
        } elseif ($format == 'pdf') {
            $from = $request->input('from');
            $to = $request->input('to');

            $regularGuests = RegularGuest::all()
                ->where('date', '>=', $from)
                ->where('date', '<=', $to)
                ->sortBy('date');

            view()->share('regularGuests', $regularGuests);
            $pdf = Pdf::loadView('/export/regular-guest')->setPaper('A4', 'portrait');
            return $pdf->download("Laporan Tamu Reguler.pdf");
        } elseif ($format == 'xls') {
            return (new RegularGuestExport($from, $to))->download('Laporan Tamu Reguler.xls', \Maatwebsite\Excel\Excel::XLS);
        } elseif ($format == 'xlsx') {
            return (new RegularGuestExport($from, $to))->download('Laporan Tamu Reguler.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        }
    }
}
