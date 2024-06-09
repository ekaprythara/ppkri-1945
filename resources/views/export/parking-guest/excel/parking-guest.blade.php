<!DOCTYPE html>
<html lang="id">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
    <table id="head" class="w-full">
        <tr>
            <td>
                <img src="{{ public_path('/assets/image/logo.png') }}" alt="Logo Pemprov Bali" width="180"
                    height="130">
            </td>
            <td class="text-center">
                <div class="ass">MONUMEN<br>PAHLAWAN PERANG<br>KEMERDEKAAN REPUBLIK INDONESIA 1945</div>
                <div class="asd">
                    <div>Jalan Bypass Ngurah Rai, Jimbaran - Badung</div>
                    <div>Telp: 081353427277</div>
                </div>
            </td>
        </tr>
    </table>
    <hr>
    <div id="title">
        <h3>LAPORAN PARKIR</h3>
    </div>
    <table id="body">
        <thead>
            <tr>
                <th>No.</th>
                <th>Tanggal</th>
                <th>Tipe Kendaraan</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Harga Khusus</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($parkingGuests as $parkingGuest)
                <tr>
                    <td class="text-center">{{ $loop->iteration }}</td>
                    <td class="text-center w-20">{{ $parkingGuest->date }}</td>
                    <td class="text-center">{{ $parkingGuest->vehicleTypes->name }}</td>
                    <td class="text-center w-2">{{ $parkingGuest->count }}</td>
                    <td class="text-right w-20">{{ "Rp ".number_format($parkingGuest->fee,0,",",".") }}</td>
                    <td class="text-center w-2">{{ $parkingGuest->isCustomFee === 1 ? "YES" : "NO" }}</td>
                    <td>{{ $parkingGuest->description }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>