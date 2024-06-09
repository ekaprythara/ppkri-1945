<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->foreignId("agent_id")->constrained("agents", "id");
            $table->foreignId("driver_id")->constrained("drivers", "id");
            $table->string('count');
            $table->foreignId("ticket_id")->constrained("tickets", "id");
            $table->boolean("isCustomPrice");
            $table->string("price");
            $table->string("description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
