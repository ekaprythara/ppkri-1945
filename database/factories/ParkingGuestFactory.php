<?php

namespace Database\Factories;

use App\Models\VehicleType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParkingGuest>
 */
class ParkingGuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "date" => fake()->dateTimeBetween('-16 months', 'now'),
            "vehicleType_id" => VehicleType::all()->random()->id,
            "count" => fake()->randomNumber(1, true),
            "isCustomFee" => fake()->boolean(),
            "fee" => fake()->randomNumber(5, true),
            "description" => fake()->sentence(5)
        ];
    }
}
