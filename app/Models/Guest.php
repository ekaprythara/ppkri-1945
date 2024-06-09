<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function agents()
    {
        return $this->belongsTo(Agent::class, 'agent_id');
    }

    public function drivers()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }

    public function tickets()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }
}
