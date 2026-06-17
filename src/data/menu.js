/* Barrio Bamba — menú real (cliente + panel). Tomado del menú impreso del local. */

const C = (id, name) => ({ id, name });

const categories = [
  C('light', 'Bamba Light'),
  C('tacos', 'Tacos'),
  C('burgers', 'Hamburguesas'),
  C('pastas', 'Pastas'),
  C('antojitos', 'Antojitos Mexicanos'),
  C('snacks', 'Snacks'),
  C('frias', 'Bebidas Frías'),
  C('calientes', 'Bebidas Calientes'),
  C('dulce', 'Dulce Antojo'),
  C('bebidas', 'Bebidas'),
];

const p = (id, cat, name, price, desc, extra) =>
  Object.assign({ id, cat, name, price, desc, active: true, image: null }, extra || {});

const products = [
  // Bamba Light
  p('l1', 'light', 'Sandwich pechuga de pollo', 140, 'Pan de grano, queso panela, jitomate y ensalada de lechuga.'),
  p('l2', 'light', 'Sandwich pechuga de pavo', 135, 'Pan de grano, queso panela, jitomate y ensalada de lechuga.'),
  p('l3', 'light', 'Pechuga a la plancha', 160, 'Con ensalada de lechuga, cubos de queso panela y jitomate.'),
  p('l4', 'light', 'Pechuga a las finas hierbas', 165, 'Acompañada de verduras salteadas.'),

  // Tacos
  p('t1', 'tacos', 'Tacos', 50, 'Bistec, pechuga, longaniza o carne enchilada. +15 con queso.', { badge: 'Martes 2x$70', badgeTone: 'accent' }),
  p('t2', 'tacos', 'Taco de arrachera', 60, 'Tortilla de maíz, cebolla y cilantro.'),
  p('t3', 'tacos', 'Quesadilla de queso', 40, 'Tortilla de harina.'),

  // Hamburguesas (todas con papas a la francesa)
  p('h1', 'burgers', 'Sencilla', 120, 'Queso manchego, lechuga, jitomate y papas a la francesa.'),
  p('h2', 'burgers', 'Especial', 140, 'Queso manchego, queso americano, tocino, lechuga, jitomate y papas.'),
  p('h3', 'burgers', 'Hawaiana', 150, 'Queso americano, piña, tocino, jitomate y papas a la francesa.'),
  p('h4', 'burgers', 'Doble', 195, '2 pzas de proteína, queso americano y manchego, jamón, tocino, lechuga y jitomate.'),

  // Pastas
  p('pa1', 'pastas', 'Bolognesa', 150, 'Pasta, carne molida, salsa de tomate y queso parmesano.'),
  p('pa2', 'pastas', 'Pasta poblana', 160, 'Pasta a la crema, pechuga asada y queso parmesano.'),
  p('pa3', 'pastas', 'Pasta con camarones', 235, 'Pasta a la crema, camarones a la mantequilla y parmesano.'),

  // Antojitos Mexicanos
  p('a1', 'antojitos', 'Del rancho', 165, 'Milanesa de pollo con chilaquiles verdes.'),
  p('a2', 'antojitos', 'Arrachera', 185, 'Acompañada de ensalada verde y papas a la francesa.'),
  p('a3', 'antojitos', 'Enchiladas o chilaquiles verdes', 150, 'Con pechuga asada o bistec arrachera +25.'),
  p('a4', 'antojitos', 'Salmón a la plancha', 220, 'Acompañado de ensalada verde y papas a la francesa.'),

  // Snacks
  p('s1', 'snacks', 'Conos', 120, 'Boneless, nuggets o palomitas de pollo. Incluyen 240g de proteína y papas.'),
  p('s2', 'snacks', 'Boneless, nuggets o palomitas', 95, '250g de proteína.', { badge: 'Jueves 2x$190', badgeTone: 'accent' }),
  p('s3', 'snacks', 'Papas gajo Bamba', 110, 'Papas gajo bañadas en queso amarillo, tocino y queso parmesano.'),
  p('s4', 'snacks', 'Papas francesa Bamba', 100, 'Papas a la francesa bañadas en queso amarillo, tocino y parmesano.'),
  p('s5', 'snacks', 'Papas gajo', 80, 'Orden de papas gajo.'),
  p('s6', 'snacks', 'Papas francesas', 65, 'Orden de papas a la francesa.'),
  p('s7', 'snacks', 'Dedos de queso', 110, 'Capeados y crujientes.'),
  p('s8', 'snacks', 'Sincronizada', 75, 'Jamón y queso en tortilla de harina.'),
  p('s9', 'snacks', 'Papas locas', 90, 'Papas de hojuela, gomitas y cacahuates en salsas negras, valentina y tajín.'),

  // Bebidas Frías
  p('f1', 'frias', 'Limonadas', 65, 'Clásica, frambuesa, pepino o cereza.'),
  p('f2', 'frias', 'Soda italiana', 85, 'Frambuesa, mora azul, cereza y pepino.'),
  p('f3', 'frias', 'Smoothie', 85, 'Mango, fresa y frutos rojos.'),
  p('f4', 'frias', 'Chamoyada', 90, 'Mango, fresa y frutos rojos.'),
  p('f5', 'frias', 'Frappé', 90, 'Macadamia, crema irlandesa, vainilla, caramelo, taró, mazapán o cookies and cream.'),
  p('f6', 'frias', 'Cerveza de sabor', 120, 'Mango, frutos rojos, fresa, cubana y clamato.', { withFood: true, badge: 'Con alimentos', badgeTone: 'outline' }),
  p('f7', 'frias', 'Chelada', 110, 'Incluye 2 cervezas XX Lager o Indio. +10 Corona/Victoria/Pacífico, +15 Bohemia.', { withFood: true, badge: 'Con alimentos', badgeTone: 'outline' }),

  // Bebidas Calientes
  p('c1', 'calientes', 'Chocolate caliente', 85, 'Cremoso, con un toque de canela.'),
  p('c2', 'calientes', 'Capuchino', 85, 'Macadamia, crema irlandesa, vainilla y caramelo.'),
  p('c3', 'calientes', 'Matcha y taro', 85, 'Té matcha y taro.'),

  // Dulce Antojo
  p('d1', 'dulce', 'Mini crepas Nutella', 100, 'Crepas recién hechas con Nutella.'),
  p('d2', 'dulce', 'Mini crepas Nutella con fresa', 115, 'Incluye 2 mini crepas.'),
  p('d3', 'dulce', 'Pastel', 85, 'Mil hojas o tres leches. Consulta las opciones del día con tu mesero.'),

  // Bebidas
  p('b1', 'bebidas', 'Refresco 350 ml', 40, 'Línea Coca-Cola.'),
  p('b2', 'bebidas', 'Agua natural 1 L', 40, 'Botella de 1 litro.'),
  p('b3', 'bebidas', 'Clericot 500 ml', 120, 'Vino tinto con frutas.', { withFood: true, badge: 'Con alimentos', badgeTone: 'outline' }),
];

const promos = [
  { id: 'pr-mar', day: 'Martes', name: 'Martes de Tacos', detail: '2 tacos por $70 (pechuga, longaniza o enchilada).', tone: 'accent', active: true, from: 'Cada martes', to: '2:30–10:45 pm' },
  { id: 'pr-mie', day: 'Miércoles', name: 'Miércoles de Hamburguesas', detail: '2 hamburguesas sencillas con papas + 2 refrescos por $270.', tone: 'ink', active: false, from: 'Cada miércoles', to: '2:30–10:45 pm' },
  { id: 'pr-jue', day: 'Jueves', name: 'Jueves de Boneless', detail: '2 órdenes de boneless o palomitas de pollo con papas por $190.', tone: 'ink', active: false, from: 'Cada jueves', to: '2:30–10:45 pm' },
  { id: 'pr-vie', day: 'Viernes', name: 'Viernes de Papas Gajo', detail: '2 órdenes de papas gajo por $130.', tone: 'ink', active: false, from: 'Cada viernes', to: '2:30–10:45 pm' },
  { id: 'pr-sab', day: 'Sábado', name: 'Sábado de Papas', detail: '2 órdenes de papas a la francesa por $90.', tone: 'ink', active: false, from: 'Cada sábado', to: '2:30–10:45 pm' },
];

const info = {
  name: 'Barrio Bamba',
  tagline: 'restaurant',
  hours: 'Martes a sábado · 2:30 – 10:45 pm',
  rule: 'Venta de cerveza sólo con alimentos.',
  currency: '$',
  address: 'C. Riobamba 700, Lindavista Sur, Gustavo A. Madero, 07300 Ciudad de México, CDMX',
};

// Mapa de Google Maps incrustado (sin API key) usando la dirección completa,
// que geolocaliza el local correctamente. El enlace abre Google Maps para llegar.
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(info.address)}&z=16&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address)}`;

export const MENU = { categories, products, promos, info };
export const money = (n) => '$' + Number(n).toLocaleString('es-MX');
