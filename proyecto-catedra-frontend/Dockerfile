FROM node:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dos2unix para convertir el archivo a formato Unix
RUN apt-get update && apt-get install -y dos2unix

# Copiar los archivos de definición de dependencias
COPY package.json package-lock.json ./ 

# Instalar dependencias durante el build
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Copiar el script de entrypoint al contenedor
COPY entrypoint.sh /entrypoint.sh

# Convertir entrypoint.sh a formato Unix
RUN dos2unix /entrypoint.sh

# Asignar permisos de ejecución al script
RUN chmod +x /entrypoint.sh

# Exponer el puerto de Next.js
EXPOSE 3000

# Configurar el entrypoint y el comando por defecto
ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "dev"]
