import { registerUserVerify } from '@directus/sdk';
import { directus } from './directus.mjs';

// En tu web, el token llega en la URL: /verificar?token=...
const token = process.argv[2];
await directus.request(registerUserVerify(token));
console.log('Cuenta confirmada');
