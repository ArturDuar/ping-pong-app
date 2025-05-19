<?php

namespace Database\Factories;

use App\Models\Estado;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Torneo>
 */
class TorneoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre_torneo' => $this->faker->word . ' ' . $this->faker->word, // Nombre del torneo
            'descripcion' => $this->faker->paragraph, // Descripción aleatoria
            'lugar_evento' => $this->faker->city, // Lugar del evento (ciudad aleatoria)
            'fecha_inicio' => $this->faker->date(), // Fecha de inicio
            'fecha_fin' => $this->faker->date(), // Fecha de fin
            'categoria_genero' => $this->faker->randomElement(['Masculino', 'Femenino', 'Mixto']), // Categoría de género aleatoria
            'num_participantes' => 16, // Número de participantes aleatorio
            'id_usuario' => User::inRandomOrder()->first()->id, // Usuario aleatorio asociado
            'id_estado' => Estado::inRandomOrder()->first()->id, // Estado aleatorio asociado
        ];
    }
}
