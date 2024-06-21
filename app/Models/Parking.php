<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parking extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    protected $table = "parking";


    public function vehicleTypes()
    {
        return $this->belongsTo(VehicleType::class, "vehicleType_id");
    }
}
