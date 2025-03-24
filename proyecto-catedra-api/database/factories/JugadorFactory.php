<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jugador>
 */
class JugadorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre_jugador' => $this->faker->name,  // Nombre del jugador
            'enlace_fotografia' => $this->faker->imageUrl(640, 480, 'people'),  // Enlace de fotografía (URL aleatoria)
            'genero' => $this->faker->randomElement(['Masculino', 'Femenino']),  // Género aleatorio
            'fecha_nacimiento' => $this->faker->date(),  // Fecha de nacimiento aleatoria
            'nacionalidad' => $this->faker->country,  // Nacionalidad aleatoria
            'id_usuario' => User::inRandomOrder()->first()->id,  // Asocia un usuario aleatorio de la tabla 'users'
        ];
    }
}
