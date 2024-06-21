<?php

namespace Database\Seeders;

use App\Models\Agent;
use App\Models\AgentGuest;
use App\Models\Driver;
use App\Models\Facility;
use App\Models\Ticket;
use App\Models\User;
use App\Models\VehicleType;
use Illuminate\Database\Seeder;
use App\Models\Level;
use App\Models\RegularGuest;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Level::create([
            "name" => "Owner",
        ]);
        Level::create([
            "name" => "Admin",
        ]);

        User::create([
            "name" => "Ni Putu Prima Septiani",
            'username' => 'primaseptiani',
            'password' => 'password',
            'phone_number' => "081353427277",
            'level_id' => "1"
        ]);
        User::create([
            "name" => "I Putu Eka Priyanthara",
            'username' => 'ekapriyanthara',
            'password' => 'password',
            'phone_number' => "085175088570",
            'level_id' => "2"
        ]);

        Agent::create([
            "name" => "Bojue Photography",
            'address' => "Badung",
            'email' => null,
            'phone_number' => null,
        ]);
        Agent::create([
            "name" => "Aster Wedding Organizer",
            'address' => 'Badung',
            'email' => 'asterwedding811@gmail.com',
            'phone_number' => null,
        ]);
        Agent::create([
            "name" => "Blue Photography",
            'address' => 'Badung',
            'email' => "bluephotography@gmail.com",
            'phone_number' => null,
        ]);

        Driver::create([
            "name" => "Nanang",
            'phone_number' => "123456789012",
            "agent_id" => "1"
        ]);
        Driver::create([
            "name" => "Badur",
            'phone_number' => "123423129012",
            "agent_id" => "1"
        ]);
        Driver::create([
            "name" => "Made Agus",
            'phone_number' => "123451239012",
            "agent_id" => "2"
        ]);

        VehicleType::create([
            "name" => "Motor",
            "fee" => "2000"
        ]);
        VehicleType::create([
            "name" => "Mobil",
            "fee" => "5000",
        ]);

        Ticket::create([
            "name" => "Personal",
            "price" => "40000",
            "unit" => "Orang"
        ]);
        Ticket::create([
            "name" => "Prewedding (Lokal)",
            "price" => "350000",
            "unit" => "Couple"
        ]);
        Ticket::create([
            "name" => "Prewedding (Asing)",
            "price" => "600000",
            "unit" => "Couple"
        ]);

        Facility::create([
            "name" => "Toilet",
        ]);
        Facility::create([
            "name" => "Ruang Ganti",
        ]);

        RegularGuest::create([
            "date" => Carbon::now(),
            "name" => "James",
            "count" => "1",
            "price" => "40000",
            "isCustomPrice" => false,
            "description" => "Tamu Indo",
        ]);
        RegularGuest::create([
            "date" => "2024-05-02",
            "name" => "Bond",
            "count" => "1",
            "price" => "20000",
            "isCustomPrice" => true,
            "description" => "",
        ]);

        AgentGuest::create([
            "date" => "2024-06-19",
            "driver_id" => 2,
            "count" => 1,
            "ticket_id" => null,
            "isCustomPrice" => true,
            "price" => "200000",
            "description" => null
        ]);
    }
}
