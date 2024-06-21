<!DOCTYPE html>
<html lang="id">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        .text-right {
            text-align: right;
        }

        #head {
            text-align: center;
            line-height: 1.5rem;
            font-size: 1rem;
        }

        #title {
            text-align: center;
            line-height: 2px;
            padding: 5px 5px 5px;
        }

        #body {
            border-collapse: collapse;
            width: 100%;
            font-size: 10pt;
            color: black;
        }

        #body td,
        #body th {
            padding: 5px;
            border: 1px solid black;
        }

        .w-2 {
            width: 0.5rem;
        }
        .w-20 {
            width: 5rem;
        }
        .text-center {
            text-align: center;
        }
        .w-full {
            width: 100%;
        }

        .asd {
            line-height: 1.2rem;
        }

        .ass {
            line-height: 1.2rem;
            font-size: 1.2rem;
            font-weight: bold;
        }

        #body tr:nth-child(even) {
            background-color: #becbd6;
        }

        #body th {
            padding-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            background-color: #83B4FF;
            color: black;
        }
    </style>
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
        <h3>LAPORAN TAMU REGULER</h3>
    </div>
    <table id="body">
        <thead>
            <tr>
                <th>No.</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($regularGuests as $regularGuest)
                <tr>
                    <td class="text-center">{{ $loop->iteration }}</td>
                    <td class="text-center w-20">{{ $regularGuest->date }}</td>
                    <td class="text-center">{{ $regularGuest->name }}</td>
                    <td class="text-center w-2">{{ $regularGuest->count }}</td>
                    <td class="text-right w-20">{{ "Rp ".number_format($regularGuest->price,0,",",".") }}</td>
                    <td>{{ $regularGuest->description }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>