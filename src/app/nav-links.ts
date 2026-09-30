/** Enlaces del menú principal y del pie de página. */
export interface NavLink {
  label: string;
  path: string;
  fragment?: string;
  /** Marca el enlace como activo solo si la ruta coincide exacta. */
  exact?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Inicio', path: '/', exact: true },
  { label: 'Planes', path: '/planes' },
  { label: 'Horarios', path: '/', fragment: 'schedules', exact: true },
  { label: 'Ubicación', path: '/', fragment: 'ubication', exact: true },
  { label: 'Galería', path: '/galeria' },
  { label: 'Políticas', path: '/politicas_reserva' },
];
