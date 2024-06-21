<?php

namespace App\Http\Controllers;

use App\Exports\AgentGuestExport;
use App\Models\Agent;
use App\Models\AgentGuest;
use App\Models\Driver;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class AgentGuestReportController extends Controller
{
    public function index()
    {
        $agentGuests = AgentGuest::with("driver.agent")->get();
        $agents = Agent::all();
        $drivers = Driver::all();
        return inertia("Report/AgentGuest", [
            "agentGuests" => $agentGuests,
            "drivers" => $drivers,
            "agents" => $agents,
        ]);
    }

    public function print(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');


        $agentGuests = AgentGuest::with('driver.agent')
            ->where('date', '>=', $from)
            ->where('date', '<=', $to)
            ->orderBy('date')
            ->get();

        view()->share('agentGuests', $agentGuests);
        $pdf = Pdf::loadView('/export/agent-guest')->setPaper('A4', 'portrait');
        return $pdf->stream();
    }

    public function export(Request $request)
    {
        $from = $request->input('from');
        $to = $request->input('to');
        $format = $request->input('format');

        if ($format == 'ods') {
            return (new AgentGuestExport($from, $to))->download('Laporan Tamu Agen.ods', \Maatwebsite\Excel\Excel::ODS);
        } elseif ($format == 'pdf') {
            $from = $request->input('from');
            $to = $request->input('to');

            $agentGuests = AgentGuest::with('driver.agent')
                ->where('date', '>=', $from)
                ->where('date', '<=', $to)
                ->orderBy('date')
                ->get();

            view()->share('agentGuests', $agentGuests);
            $pdf = Pdf::loadView('/export/agent-guest')->setPaper('A4', 'portrait');
            return $pdf->download("Laporan Tamu Agen.pdf");
        } elseif ($format == 'xls') {
            return (new AgentGuestExport($from, $to))->download('Laporan Tamu Agen.xls', \Maatwebsite\Excel\Excel::XLS);
        } elseif ($format == 'xlsx') {
            return (new AgentGuestExport($from, $to))->download('Laporan Tamu Agen.xlsx', \Maatwebsite\Excel\Excel::XLSX);
        }
    }
}
