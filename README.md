# Cirkula Web - Prueba Técnica Frontend

Panel de administración desarrollado en React 19 con TypeScript para gestionar tiendas a través de la API REST de Cirkula.

---

## Tecnologías

- **React 19** con TypeScript
- **Vite 7** como bundler
- **TailwindCSS 4** para estilos
- **TanStack Query 5** para manejo de estado del servidor
- **React Router 7** para navegación
- **Axios** para peticiones HTTP
- **React Leaflet** para mapas interactivos
- **React Hot Toast** para notificaciones

---

## Requisitos previos

- Node.js 18 o superior
- Yarn

---

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cirkula-web.git
cd cirkula-web
```

### 2. Instalar dependencias

```bash
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://prueba-tecnica-cirkula-backend-production.up.railway.app/api
```

### 4. Correr el proyecto

```bash
yarn dev
```

Abre el navegador en `http://localhost:5173`

---

## Funcionalidades

- Listado de tiendas con distancia calculada desde Miraflores, Lima
- Creación de tiendas con subida de imagen al banner via Cloudinary
- Mapa interactivo para seleccionar la ubicación de la tienda
- Indicador de estado abierto/cerrado en tiempo real

---

## Estructura del proyecto

```
src/
├── api/                    # Configuración de Axios
├── config/                 # Query client de TanStack Query
├── constants/              # Regex de validación
├── core/
│   ├── components/
│   │   ├── shared/         # Componentes reutilizables (inputs, botones, navbar)
│   │   └── skeletons/      # Loading skeletons
│   ├── features/
│   │   └── stores/         # Módulo de tiendas
│   │       ├── components/ # StoreList
│   │       ├── forms/      # Configuración del formulario
│   │       ├── hook/       # useStoreQuery, useStoreMutation
│   │       ├── pages/      # StorePage
│   │       ├── services/   # store.service.ts
│   │       └── types/      # Tipos TypeScript
│   ├── hooks/shared/       # useForm, useFormValidation
│   └── router/             # AppRouter, PanelRoutes
└── helpers/                # getEnvVariables
```

---

## Backend

Este proyecto consume la API REST del backend de Cirkula. Puedes encontrar el repositorio en:
[cirkula-api](https://github.com/tu-usuario/cirkula-api)