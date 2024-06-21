<?php

namespace App\Exports;

use App\Models\AgentGuest;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;

class AgentGuestExport implements FromCollection, ShouldAutoSize, WithMapping, WithHeadings, WithEvents, WithCustomStartCell
{
  use Exportable;
  /**
   * @return \Illuminate\Support\Collection
   */

  protected $from;
  protected $to;

  function __construct($from, $to)
  {
    $this->from = $from;
    $this->to = $to;
  }

  public function collection()
  {
    return AgentGuest::with('driver.agent')
      ->where('date', '>=', $this->from)
      ->where('date', '<=', $this->to)
      ->orderBy('date')
      ->get();
  }

  protected $i = 1;

  public function map($agentGuest): array
  {
    return [
      $this->i++,
      $agentGuest->date,
      $agentGuest->driver->agent->name,
      $agentGuest->driver->name,
      $agentGuest->count,
      $agentGuest->price,
      $agentGuest->description
    ];
  }

  public function headings(): array
  {
    return [
      'No.',
      'Tanggal',
      'Agen',
      'Supir',
      'Jumlah',
      'Harga',
      'Keterangan',
    ];
  }

  public function registerEvents(): array
  {
    $agentGuests = AgentGuest::with('driver.agent')
      ->where('date', '>=', $this->from)
      ->where('date', '<=', $this->to)
      ->orderBy('date')
      ->get();
    $temp_count = $agentGuests->count();
    $count = $temp_count + 7;
    $cellRange = "A7:G" . $count;

    return [
      AfterSheet::class => function (AfterSheet $event) use ($cellRange) {
        $event->sheet->getDelegate()->mergeCells('A1:G1')->setCellValue('A1', 'MONUMEN')
          ->getStyle('A1:G1')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);


        $event->sheet->getDelegate()->mergeCells('A2:G2')->setCellValue('A2', 'PAHLAWAN PERANG')
          ->getStyle('A2:G2')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $event->sheet->getDelegate()->mergeCells('A3:G3')->setCellValue('A3', 'KEMERDEKAAN REPUBLIK INDONESIA')
          ->getStyle('A3:G3')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        $event->sheet->getDelegate()->mergeCells('A5:G5')->setCellValue('A5', 'LAPORAN TAMU AGEN')
          ->getStyle('A5:G5')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);


        $event->sheet->getStyle('A7:I7')->applyFromArray([
          'font' => [
            'bold' => true,
          ]
        ]);
        $event->sheet->getStyle($cellRange)->applyFromArray([
          'borders' => [
            'allBorders' => [
              'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
              'color' => ['argb' => '00000000'],
            ],
          ]
        ]);
      }
    ];
  }

  public function startCell(): string
  {
    return 'A7';
  }
}
