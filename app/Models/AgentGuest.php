<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentGuest extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }


    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }
}
