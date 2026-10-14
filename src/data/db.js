// Fuente de datos simulada (semilla) de la tienda. `init.js` la copia a localStorage
// la primera vez; desde ahí los módulos de cada entidad hacen el CRUD.

const image = (text, size = '400x300') => `https://placehold.co/${size}/webp?text=${encodeURIComponent(text)}`

export const categorias = [
  { id: 1, nombre: 'Aventura', descripcion: 'Explora mundos abiertos y vive grandes historias.', imagen: image('Aventura', '400x200') },
  { id: 2, nombre: 'Acción', descripcion: 'Shooters y combate para jugar solo o en línea.', imagen: image('Acción', '400x200') },
  { id: 3, nombre: 'Deportes', descripcion: 'Fútbol, básquetbol, autos y más.', imagen: image('Deportes', '400x200') },
  { id: 4, nombre: 'Indie', descripcion: 'Joyas de estudios independientes.', imagen: image('Indie', '400x200') },
  { id: 5, nombre: 'Estrategia', descripcion: 'Planifica, construye y conquista.', imagen: image('Estrategia', '400x200') },
]

const producto = (id, nombre, categoriaId, precio, stock, { precioOferta = null, stockCritico = 5, descripcion } = {}) => ({
  id,
  nombre,
  descripcion: descripcion ?? `${nombre} en formato digital. Código de descarga enviado por correo tras la compra.`,
  precio,
  precioOferta,
  categoriaId,
  stock,
  stockCritico,
  imagen: image(nombre),
})

export const productos = [
  producto(1, 'The Legend of Zelda: Breath of the Wild', 1, 49990, 12, { precioOferta: 39990, descripcion: 'Explora Hyrule con total libertad en una de las aventuras más premiadas de la historia.' }),
  producto(2, 'Super Mario Odyssey', 1, 44990, 8, { descripcion: 'Viaja por reinos llenos de secretos junto a Mario y Cappy.' }),
  producto(3, 'Red Dead Redemption 2', 1, 29990, 4, { precioOferta: 19990, descripcion: 'Una épica historia del viejo oeste en un mundo abierto enorme.' }),
  producto(4, 'The Witcher 3: Wild Hunt', 1, 24990, 15, { descripcion: 'Encarna a Geralt de Rivia en un RPG de mundo abierto con decisiones que importan.' }),
  producto(5, 'God of War Ragnarök', 1, 54990, 6),
  producto(6, 'Fortnite: Paquete de V-Bucks', 2, 9990, 30, { descripcion: 'Paquete de moneda virtual para Fortnite.' }),
  producto(7, 'Overwatch 2: Paquete Invasión', 2, 19990, 10, { precioOferta: 14990 }),
  producto(8, 'Call of Duty: Modern Warfare III', 2, 59990, 3),
  producto(9, 'Halo Infinite', 2, 34990, 9),
  producto(10, 'Elden Ring', 2, 44990, 7, { precioOferta: 34990 }),
  producto(11, 'EA Sports FC 25', 3, 54990, 20),
  producto(12, 'NBA 2K25', 3, 49990, 5, { precioOferta: 29990 }),
  producto(13, 'Rocket League: Pase de temporada', 3, 7990, 40),
  producto(14, 'Gran Turismo 7', 3, 39990, 2),
  producto(15, 'Among Us', 4, 4990, 50, { descripcion: 'Descubre al impostor junto a tus amigos.' }),
  producto(16, 'Hollow Knight', 4, 9990, 18, { precioOferta: 6990 }),
  producto(17, 'Stardew Valley', 4, 9990, 25),
  producto(18, 'Minecraft', 4, 19990, 35, { descripcion: 'Construye, explora y sobrevive en un mundo de bloques infinito.' }),
  producto(19, 'Animal Crossing: New Horizons', 5, 44990, 4),
  producto(20, 'Civilization VI', 5, 29990, 11, { precioOferta: 9990 }),
  producto(21, 'Age of Empires IV', 5, 24990, 6),
]

export const usuarios = [
  {
    id: 1,
    nombre: 'Admin',
    apellidos: 'GameStore',
    email: 'admin@duoc.cl',
    password: 'admin123',
    telefono: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    calle: 'Av. España 8',
    depto: '',
    rol: 'admin',
  },
  {
    id: 2,
    nombre: 'Juana',
    apellidos: 'Pérez Soto',
    email: 'juana@gmail.com',
    password: 'cliente1',
    telefono: '+56912345678',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    calle: 'Calle Valparaíso 123',
    depto: '603',
    rol: 'cliente',
  },
]

export const blogs = [
  {
    id: 1,
    titulo: 'Los lanzamientos más esperados del año',
    fecha: '2026-09-02',
    resumen: 'Repasamos los juegos que llegarán a la tienda en los próximos meses.',
    contenido: [
      'El calendario de lanzamientos viene cargado: nuevas entregas de sagas clásicas, secuelas de éxitos indie y varios mundos abiertos que prometen cientos de horas de juego.',
      'En GameStore tendremos preventas con descuento para los títulos más pedidos. Revisa la sección de ofertas para no perderte nada.',
    ],
    imagen: image('Lanzamientos', '1200x600'),
  },
  {
    id: 2,
    titulo: 'Guía para armar tu primera colección retro',
    fecha: '2026-09-20',
    resumen: 'Consejos para empezar a coleccionar sin gastar de más.',
    contenido: [
      'Coleccionar juegos clásicos es un hobby que crece año a año. Lo primero es definir una consola o una saga y enfocarse en ella.',
      'Compara precios, revisa el estado de los productos y aprovecha las ediciones remasterizadas, que suelen ser más económicas y fáciles de encontrar.',
    ],
    imagen: image('Retro', '1200x600'),
  },
]

export const regiones = [
  { nombre: 'Región de Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { nombre: 'Región de Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'] },
  { nombre: 'Región de Antofagasta', comunas: ['Antofagasta', 'Calama', 'Mejillones', 'Tocopilla'] },
  { nombre: 'Región de Atacama', comunas: ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral'] },
  { nombre: 'Región de Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'] },
  { nombre: 'Región de Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Los Andes'] },
  {
    nombre: 'Región Metropolitana de Santiago',
    comunas: ['Santiago', 'Cerrillos', 'Estación Central', 'La Florida', 'Las Condes', 'Maipú', 'Ñuñoa', 'Providencia', 'Puente Alto', 'San Bernardo'],
  },
  { nombre: "Región del Libertador General Bernardo O'Higgins", comunas: ['Rancagua', 'Machalí', 'San Fernando', 'Pichilemu'] },
  { nombre: 'Región del Maule', comunas: ['Talca', 'Curicó', 'Linares', 'Constitución'] },
  { nombre: 'Región de Ñuble', comunas: ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes'] },
  { nombre: 'Región del Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel', 'San Pedro de la Paz'] },
  { nombre: 'Región de La Araucanía', comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Angol'] },
  { nombre: 'Región de Los Ríos', comunas: ['Valdivia', 'La Unión', 'Río Bueno', 'Panguipulli'] },
  { nombre: 'Región de Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Puerto Varas'] },
  { nombre: 'Región de Aysén del General Carlos Ibáñez del Campo', comunas: ['Coyhaique', 'Aysén', 'Chile Chico', 'Cochrane'] },
  { nombre: 'Región de Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir', 'Cabo de Hornos'] },
]
