<?php

namespace Database\Seeders;

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

        DB::table('estado')->insert([
            ['nombre_estado' => 'En Curso'],
            ['nombre_estado' => 'Próximo'],
            ['nombre_estado' => 'Finalizado']
        ]);
    }
}
