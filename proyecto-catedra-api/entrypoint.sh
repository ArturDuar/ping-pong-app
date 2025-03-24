#!/bin/sh
set -e

# Si no existe la carpeta vendor, instala las dependencias
if [ ! -d vendor ]; then
  echo "Instalando dependencias de Composer..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Ejecuta el comando que se pase al contenedor
exec "$@"
