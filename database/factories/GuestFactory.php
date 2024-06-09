<?php

namespace Database\Factories;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guest>
 */
class GuestFactory extends Factory
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
            "agent_id" => Agent::all()->random()->id,
            "count" => fake()->randomNumber(1, true),
            "price" => fake()->randomNumber(6, true),
            "description" => fake()->sentence(5)
        ];
    }
}
