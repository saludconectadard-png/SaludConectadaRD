const N8N_URL_BASE =
  process.env.N8N_WEBHOOK_BASE_URL ||
  'https://monkey-adapting-cub.ngrok-free.app';

export const WEBHOOK_URLS = {
  citas: `${N8N_URL_BASE}/webhook/pacientes`,
  voluntarios: `${N8N_URL_BASE}/webhook/voluntarios`,
  donaciones: `${N8N_URL_BASE}/webhook/donaciones`,
} as const;

export const APP_CONFIG = {
  name: 'Salud Conectada RD',
  description:
    'Optimizando la gestión de citas médicas y la red de voluntarios en centros de salud comunitarios.',
  email: 'saludconectadard@gmail.com',
  tagline: 'Salud para todos, a un clic de distancia',
} as const;

export const TOAST_CONFIG = {
  LIMIT: 1,
  REMOVE_DELAY: 5000,
} as const;

export const RESPONSE_MESSAGES = {
  SUCCESS: {
    CITA: '¡Gracias! Tu cita ha sido registrada.',
    VOLUNTARIO: '¡Gracias por tu interés! Hemos recibido tu información.',
    DONACION: '¡Gracias por tu donación!',
    EMAIL_COPIED:
      'La dirección de correo electrónico ha sido copiada al portapapeles.',
  },
  ERROR: {
    CITA: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.',
    VOLUNTARIO: 'Hubo un error al enviar tu información. Inténtalo de nuevo.',
    DONACION: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.',
    CHAT: 'Tuve un problema técnico. Por favor, intenta más tarde.',
  },
} as const;
