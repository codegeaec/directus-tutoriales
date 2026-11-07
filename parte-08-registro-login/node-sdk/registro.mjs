import { registerUser } from '@directus/sdk';
import { directus } from './directus.mjs';

await directus.request(
  registerUser('luis@example.com', 'clave-de-luis-2026', {
    first_name: 'Luis',
    verification_url: 'http://localhost:4321/verificar',
  }),
);
console.log('Listo: revisa tu correo para confirmar la cuenta');
