// Cliente de Directus para tu web (Parte 8)
import { createDirectus, rest, authentication } from '@directus/sdk';

export const directus = createDirectus('http://localhost:8056')
  .with(authentication('json'))
  .with(rest());
