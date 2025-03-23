FROM node:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias durante el build (se utilizarán si no se monta un volumen)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Copiar el script de entrypoint

# Exponer el puerto de Next.js
EXPOSE 3000

# Configurar el entrypoint y el comando por defecto
CMD ["npm", "run", "dev"]
