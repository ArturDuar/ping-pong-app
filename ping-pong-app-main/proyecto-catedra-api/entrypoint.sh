#!/bin/sh
set -e

# Si no existe la carpeta vendor, instala las dependencias
if [ ! -d vendor ]; then
  echo "Instalando dependencias de Composer..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Esperar a que la base de datos esté lista / aqui podemos ajustar el tiempo de espera
echo "Esperando a que la base de datos esté lista..."
sleep 10

# Limpiar la configuración y la caché
echo "Limpiando configuración y caché..."
php artisan config:clear
php artisan cache:clear

# Ejecutar migraciones y seeders de Laravel
php artisan migrate:fresh --force
php artisan db:seed --force

# Ejecuta el comando que se pase al contenedor
exec "$@"
