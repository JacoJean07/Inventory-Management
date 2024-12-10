# Inventory Management v0.1.3

> ⚠️ **Proyecto en Desarrollo**
> Este proyecto aún está en desarrollo y puede contener errores. Por favor, no lo uses en producción.

Una aplicación web para gestionar inventarios, permitiendo registrar, editar y eliminar productos con variantes, colores, tallas, imágenes, entre otros.

---

## 🚀 Tecnologías Utilizadas

- **Backend:** PHP 8.2, Laravel 11
- **Frontend:** React, Inertia.js, Tailwind CSS, DaisyUI
- **Componentes Adicionales:** ApexCharts, MUI, Styled Components
- **Gestión de Roles y Permisos:** Spatie Laravel Permission

---

## 📦 Dependencias

### Composer:
```bash
composer require inertiajs/inertia-laravel laravel/sanctum spatie/laravel-permission tightenco/ziggy
```

### NPM:
```bash
npm install @emotion/react @emotion/styled @heroicons/react @inertiajs/react @mui/icons-material @mui/material react-apexcharts styled-components bootstrap-icons daisyui
```

---

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/JacoJean07/Inventory-Management.git
   cd inventory-management
   ```
2. **Instala dependencias:**
   ```bash
   composer install
   npm install
   ```
3. **Configura el entorno:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. **Crea y migra la base de datos:**
   ```bash
   touch database/database.sqlite
   php artisan migrate --seed
   ```
5. **Inicia el servidor:**
   ```bash
   npm run dev & php artisan serve
   ```
6. **Accede a la app:**
   Abre [http://localhost:8000](http://localhost:8000).

---

## ✅ Funcionalidades

### 🛒 Productos
- Agregar, editar y eliminar productos.
- Manejo de variantes: colores y tallas.
- Subida de imágenes por producto.

### 📊 Estadísticas
- Visualización gráfica de ventas y compras usando ApexCharts.

### 📄 Recibos
- Generación de recibos de ventas y compras.
- Gestión de productos dentro de los recibos.

### 🗂️ Categorías
- Crear, editar y eliminar categorías.

### 👥 Clientes y Proveedores
- Gestión de clientes y proveedores.

---

## 📝 Cosas Pendientes

### Funcionalidades
- [ ] **Tallas:**
  - Permitir tallas personalizadas.
  - Mejora en la relación entre productos y tallas.
- [ ] **Colores:**
  - Mejorar el manejo con selectores dinámicos.
- [ ] **Imágenes:**
  - Validar el almacenamiento y eliminación de imágenes cargadas.
- [ ] **Control de Inventario:**
  - Manejo avanzado de niveles de inventario.
- [ ] **Integración de Reportes:**
  - Generar reportes en formato PDF y Excel.

---

## 🔧 Uso

### Comandos útiles:

#### Migrar base de datos
```bash
php artisan migrate --seed
```

#### Iniciar servidor local
```bash
php artisan serve
```

#### Compilar assets
```bash
npm run dev
```

---

## 🖼️ Ejemplo de Código

```bash
# Crear un producto con variantes
POST /api/products
{
  "name": "Camiseta Unisex",
  "description": "Camiseta básica unisex",
  "category_id": 1,
  "price": 15.99,
  "colors": ["#FF0000", "#00FF00"],
  "sizes": ["M", "L"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, abre un **issue** o envía un **pull request**.

---

## 👨‍💻 Autor

[JacoJean](https://jacojean.pro) - Desarrollador Full Stack Junior con ❤.

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

