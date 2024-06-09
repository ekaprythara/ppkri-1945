<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingGuest extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function vehicleTypes()
    {
        return $this->belongsTo(VehicleType::class, 'vehicleType_id');
    }
}
