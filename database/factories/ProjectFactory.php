<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->unique()->words(3, true),
            'slug' => fake()->unique()->slug(),
            'summary' => fake()->sentence(),
            'description' => fake()->paragraphs(2, true),
            'responsibilities' => [fake()->sentence()],
            'technologies' => ['Laravel', 'React'],
            'role' => 'Developer',
            'status' => 'completed',
            'is_featured' => false,
            'is_published' => true,
            'published_at' => now(),
            'sort_order' => 1,
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (): array => [
            'is_published' => false,
            'published_at' => null,
        ]);
    }
}
