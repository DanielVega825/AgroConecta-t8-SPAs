export const products = [
    {
    nombre: "Semillas de Chía",
    precio: 25000.00,
    descripcion: "Semillas premium ricas en Omega-3 para alto rendimiento.",
    imagenes: ["semillas-chia.jpg"],
    detalles: { enDescuento: true, porcentajeDescuento: 10 },
    cantidad: 50,
    stockMinimo: 10,
    descripcionLong: "Semillas de chía seleccionadas con altos estándares de pureza. Ideales para suplementación alimenticia de alta calidad.",
    categoriaId: "SEMILLAS", // SEMILLAS
    activo: true
  },
  {
    nombre: "Semillas de Arroz",
    precio: 38000.00,
    descripcion: "Variedad certificada de gran rendimiento y alta germinación.",
    imagenes: ["semillas-arroz.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 30,
    stockMinimo: 8,
    descripcionLong: "Semillas de arroz de grano largo adaptadas para sistemas de riego y secano, garantizando un alto porcentaje de germinación.",
    categoriaId: "SEMILLAS", // SEMILLAS
    activo: true
  },
  {
    nombre: "Semillas de Maíz",
    precio: 42000.00,
    descripcion: "Híbrido optimizado para climas cálidos y templados.",
    imagenes: ["semillas-maiz.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 25,
    stockMinimo: 6,
    descripcionLong: "Maíz híbrido de alto potencial de rendimiento. Excelente vigor inicial y tolerancia a las principales enfermedades foliares.",
    categoriaId: "SEMILLAS", // SEMILLAS
    activo: true
  },
  {
    nombre: "Semillas de Frijol",
    precio: 35000.00,
    descripcion: "Grano seleccionado con excelente resistencia a plagas.",
    imagenes: ["semillas-frijol.jpg"],
    detalles: { enDescuento: true, porcentajeDescuento: 15 },
    cantidad: 40,
    stockMinimo: 7,
    descripcionLong: "Variedad de frijol arbustivo de ciclo corto. Grano uniforme de excelente cocción y alta demanda en el mercado comercial.",
    categoriaId: "SEMILLAS", // SEMILLAS
    activo: true
  },
  {
    nombre: "Concentrado Ceba",
    precio: 85000.00,
    descripcion: "Suplemento para ganancia de peso acelerada en bovinos.",
    imagenes: ["concentrado-ceba.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 15,
    stockMinimo: 6,
    descripcionLong: "Alimento balanceado diseñado para la etapa de finalización o ceba de ganado vacuno, maximizando la conversión alimenticia.",
    categoriaId: "CONCENTRADOS", // CONCENTRADOS
    activo: true
  },
  {
    nombre: "Concentrado Ganado",
    precio: 85000.00,
    descripcion: "Equilibrio nutricional para ganado de leche de calidad.",
    imagenes: ["concentrado-ganado.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 28,
    stockMinimo: 9,
    descripcionLong: "Fórmula especializada que aporta los nutrientes, vitaminas y minerales necesarios para mantener una alta producción láctea.",
    categoriaId: "CONCENTRADOS", // CONCENTRADOS
    activo: true
  },
  {
    nombre: "Concentrado Pollos",
    precio: 55000.00,
    descripcion: "Alimento balanceado para engorde rápido y saludable.",
    imagenes: ["concentrado-aves.jpg"],
    detalles: { enDescuento: true, porcentajeDescuento: 5 },
    cantidad: 40,
    stockMinimo: 12,
    descripcionLong: "Micropeletizado completo para aves de corral en fase de engorde. Promueve un desarrollo óseo y muscular óptimo.",
    categoriaId: "CONCENTRADOS", // CONCENTRADOS
    activo: true
  },
  {
    nombre: "Concentrado Cerdos",
    precio: 78000.00,
    descripcion: "Fórmula para desarrollo muscular y salud digestiva óptima.",
    imagenes: ["concentrado-cerdos.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 20,
    stockMinimo: 6,
    descripcionLong: "Harina balanceada con aminoácidos esenciales para cerdos en etapa de levante y desarrollo, mejorando la digestibilidad.",
    categoriaId: "CONCENTRADOS", // CONCENTRADOS
    activo: true
  },
  {
    nombre: "Kit Herramientas",
    precio: 120000.00,
    descripcion: "Herramientas manuales básicas reforzadas.",
    imagenes: ["kit-herramientas.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 15,
    stockMinimo: 6,
    descripcionLong: "Conjunto de herramientas agrícolas manuales esenciales. Fabricadas en acero templado para mayor durabilidad en campo.",
    categoriaId: "HERRAMIENTAS", // HERRAMIENTAS
    activo: true
  },
  {
    nombre: "Esparcidor",
    precio: 95000.00,
    descripcion: "Herramientas de precisión para distribución de abono.",
    imagenes: ["esparcidor.jpg"],
    detalles: { enDescuento: true, porcentajeDescuento: 20 },
    cantidad: 8,
    stockMinimo: 6,
    descripcionLong: "Dispositivo manual ergonómico para la dosificación y esparcido uniforme de fertilizantes granulados y semillas pequeñas.",
    categoriaId: "HERRAMIENTAS", // HERRAMIENTAS
    activo: true
  },
  {
    nombre: "Sistema Ordeño",
    precio: 450000.00,
    descripcion: "Equipo de alta eficiencia para medianas fincas.",
    imagenes: ["sistema-ordeno.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 3,
    stockMinimo: 6,
    descripcionLong: "Unidad de ordeño mecánico portátil con pulsador neumático y cantina de acero inoxidable. Fácil limpieza y mantenimiento.",
    categoriaId: "HERRAMIENTAS", // HERRAMIENTAS
    activo: true
  },
  {
    nombre: "Pala Profesional",
    precio: 35000.00,
    descripcion: "Acero de alta resistencia con mango ergonómico.",
    imagenes: ["pala-profesional.jpg"],
    detalles: { enDescuento: false, porcentajeDescuento: null },
    cantidad: 22,
    stockMinimo: 10,
    descripcionLong: "Pala redonda forjada en una sola pieza de acero al carbono, ideal para excavación pesada y movimiento de tierras compactas.",
    categoriaId: "HERRAMIENTAS", // HERRAMIENTAS
    activo: true
  }
];
