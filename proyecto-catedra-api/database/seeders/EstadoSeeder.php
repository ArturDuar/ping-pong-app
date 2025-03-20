<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(DB::table('estado')->count() == 0){
            DB::table('estado')->insert([
                ['nombre_estado' => 'En Curso'],
                ['nombre_estado' => 'Próximo'],
                ['nombre_estado' => 'Finalizado']
            ]);
        }
    }
}
