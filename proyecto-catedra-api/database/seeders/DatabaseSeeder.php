<?php

namespace Database\Seeders;

use App\Models\Jugador;
use App\Models\Torneo;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Arturo',
            'password' => '1234',
        ]);

        User::factory(2)->create();
        Jugador::factory(3)->create();
        Torneo::factory(3)->create();

        DB::table('estados')->insert([
            ['nombre_estado' => 'Próximo'],
            ['nombre_estado' => 'En Curso'],
            ['nombre_estado' => 'Finalizado']
        ]);
    }
}
