<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'sku' => $this->faker->unique()->numerify('SKU-#####'),
            'barcode' => $this->faker->unique()->ean13,
            'category_id' => \App\Models\Category::factory(), // Asume que tienes una factory para Category
            'user_id' => 1,
            'price' => $this->faker->randomFloat(2, 10, 100),
            'cost' => $this->faker->randomFloat(2, 5, 50),
            'quantity' => $this->faker->numberBetween(1, 100),
            'reorder_level' => $this->faker->numberBetween(1, 10),
        ];
    }
}
