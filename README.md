# Barrio Bamba

Sitio del restaurante **Barrio Bamba**, implementado desde el sistema de diseño
(estética blanco y negro urbana/tatuaje: tinta negra sobre crema, bordes duros,
sombras tipo "sello", mono para precios). **Rudo pero limpio.**

Hecho con **Vite + React**. Sin librerías de UI: los componentes usan los tokens
de diseño (CSS custom properties) directamente.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción → dist/
npm run preview  # sirve el build de producción
```

## Superficies

Un conmutador flotante (arriba a la derecha) permite saltar entre las tres vistas:

| Ruta        | Vista                                                              |
|-------------|-------------------------------------------------------------------|
| `/`         | **Cliente (móvil)** — menú digital al que se entra por el QR de la mesa. Consulta: Inicio → Categoría → Detalle de platillo. Solo lectura (sin pedidos ni reservaciones). Estados cargando/error con la píldora **Demo** abajo. |
| `/desktop`  | **Cliente (escritorio)** — menú con barra superior, sidebar de categorías y grid. |
| `/admin`    | **Panel del dueño** — Login → Tablero, Productos (activar/desactivar, editar en drawer, precios), Promociones y edición masiva de Precios. (Demo: cualquier contraseña entra.) |

> El sitio del cliente es un **menú de consulta**: muestra platillos, precios, promos
> y horario, pero no toma pedidos en línea ni reservaciones.

## Estructura

```
src/
  styles/            tokens de diseño (colors, typography, spacing, fonts, base) + styles.css
  data/menu.js       menú real del local (43 platillos, 5 promos) y helper money()
  icons.jsx          iconos Lucide (vía lucide-react)
  components/        12 primitivas: Button, IconButton, Tag, Logo, Input, Select,
                     Switch, Badge, EmptyState, Skeleton, ProductCard, QtyStepper
  cliente/           shell, pantallas y app del lado cliente (móvil + escritorio)
  admin/             shell, pantallas y app del panel de administración
  App.jsx            router + conmutador de superficies
public/
  logo.png           logo oficial (lettering + calavera con corona)
  logo-light.png     versión clara para fondos oscuros
```

## Reglas de negocio visibles

- Horario **martes a sábado, 2:30–10:45 pm** (cabecera, checkout, reservaciones, panel).
- **Venta de cerveza/bebidas sólo con alimentos** (aviso en categoría y detalle).

## Notas / pendientes

- **Fuentes**: `Anton` / `Archivo` / `Space Mono` (Google Fonts) como sustitución del
  menú original. Si hay fuentes con licencia, integrarlas como `@font-face` local.
- **Fotos de platillos**: hoy van con placeholder "Foto próximamente". Al llegar las
  imágenes reales, cargarlas en el campo `image` de cada producto en `src/data/menu.js`.
- **Datos**: el menú vive en memoria (sin backend). El panel edita estado local; conectar
  a una API/persistencia es el siguiente paso para producción.
- **Conmutador de superficies**: es solo para revisión; quítalo de `App.jsx` en producción.
