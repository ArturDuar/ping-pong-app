#!/bin/sh
set -e

# Si no existe la carpeta node_modules, instala las dependencias
if [ ! -d "node_modules" ]; then
  echo "node_modules no encontrado. Instalando dependencias..."
<<<<<<< Updated upstream
  npm install --no-interaction
fi

# Ejecuta el comando que se pase al contenedor
=======
  npm install --prefer-dist --optimize-autoloader
fi

# Ejecuta el comando que se pase al contenedor (como npm run dev)
>>>>>>> Stashed changes
exec "$@"
