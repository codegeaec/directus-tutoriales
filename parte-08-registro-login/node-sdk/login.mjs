import { readItems } from '@directus/sdk';
import { directus } from './directus.mjs';

const sesion = await directus.login({
  email: 'luis@example.com',
  password: 'clave-de-luis-2026',
});
const minutos = sesion.expires / 60000;
console.log(`Sesión iniciada: el token dura ${minutos} min`);

// El SDK guarda el token, lo envía y lo renueva solo
const posts = await directus.request(
  readItems('posts', { fields: ['titulo'] }),
);
console.log(posts.map((p) => p.titulo));

await directus.logout();
console.log('Sesión cerrada');
