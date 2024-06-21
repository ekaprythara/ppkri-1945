<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $guarded = ["id"];

    public function agent()
    {
        return $this->belongsTo(Agent::class, 'agent_id');
    }

    public function agentGuest()
    {
        return $this->hasMany(AgentGuest::class, 'driver_id');
    }
}
