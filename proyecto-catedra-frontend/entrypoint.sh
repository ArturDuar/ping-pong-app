#!/bin/sh
set -e

# Si no existe la carpeta node_modules, instala las dependencias
if [ ! -d "node_modules" ]; then
  echo "node_modules no encontrado. Instalando dependencias..."
  npm install --no-interaction
fi

# Ejecuta el comando que se pase al contenedor
exec "$@"
