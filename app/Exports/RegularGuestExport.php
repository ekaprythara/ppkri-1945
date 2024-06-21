<?php

namespace App\Exports;

use App\Models\RegularGuest;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;

class RegularGuestExport implements FromCollection, ShouldAutoSize, WithMapping, WithHeadings, WithEvents, WithCustomStartCell
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
    return RegularGuest::all()
      ->where('date', '>=', $this->from)
      ->where('date', '<=', $this->to)
      ->sortBy('date');
  }

  protected $i = 1;

  public function map($regularGuest): array
  {
    return [
      $this->i++,
      $regularGuest->date,
      $regularGuest->name,
      $regularGuest->count,
      $regularGuest->price,
      $regularGuest->description
    ];
  }

  public function headings(): array
  {
    return [
      'No.',
      'Tanggal',
      'Nama',
      'Jumlah',
      'Harga',
      'Keterangan',
    ];
  }

  public function registerEvents(): array
  {
    $regularGuests = RegularGuest::all()
      ->where('date', '>=', $this->from)
      ->where('date', '<=', $this->to);
    $temp_count = $regularGuests->count();
    $count = $temp_count + 7;
    $cellRange = "A7:F" . $count;

    return [
      AfterSheet::class => function (AfterSheet $event) use ($cellRange) {
        $event->sheet->getDelegate()->mergeCells('A1:F1')->setCellValue('A1', 'MONUMEN')
          ->getStyle('A1:F1')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);


        $event->sheet->getDelegate()->mergeCells('A2:F2')->setCellValue('A2', 'PAHLAWAN PERANG')
          ->getStyle('A2:F2')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $event->sheet->getDelegate()->mergeCells('A3:F3')->setCellValue('A3', 'KEMERDEKAAN REPUBLIK INDONESIA')
          ->getStyle('A3:F3')->applyFromArray([
            'font' => [
              'bold' => true,
            ]
          ])->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        $event->sheet->getDelegate()->mergeCells('A5:F5')->setCellValue('A5', 'LAPORAN TAMU REGULER')
          ->getStyle('A5:F5')->applyFromArray([
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
