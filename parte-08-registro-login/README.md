# Parte 8 · Registro público y login con el SDK de Directus y Next.js

Tus clientes crean su cuenta desde tu web, confirman el correo e inician sesión, sin entrar nunca al panel de Directus.

## Qué hay

- `directus/`: el entorno (Directus 12.5.1 + Postgres + Mailpit) con `USER_REGISTER_URL_ALLOW_LIST`, la colección `posts`
  (`schema.yaml`) y la plantilla `user-registration.liquid`.
- `node-sdk/`: los scripts de la primera mitad del video, con `@directus/sdk` 27.0.0 (`registro.mjs`, `verificar.mjs`, `login.mjs`).
- `frontend/`: la web con Next.js 16 (puerto 4321): `/registro`, `/verificar`, `/login` y `/posts`.

## 1. Directus

```bash
cd directus
docker compose up -d
docker compose cp schema.yaml directus:/tmp/schema.yaml
docker compose exec directus node cli.js schema apply --yes /tmp/schema.yaml
```

En el panel (http://localhost:8056, `admin@example.com` / `directus`):

1. **Ajustes → Reglas de Acceso**: política **Clientes** sin "Acceso a la aplicación" y con lectura de `posts`.
   Al no tener acceso al panel, sus usuarios no ocupan ninguno de los 3 puestos del plan Core.
2. **Ajustes → Roles**: rol **Cliente** con esa política.
3. **Ajustes → Registro de Usuario**: actívalo, elige el rol Cliente y deja activada la verificación del correo.

`USER_REGISTER_URL_ALLOW_LIST` (en el compose) permite `http://localhost:4321/verificar`: sin eso Directus rechaza la
`verification_url`.

## 2. Con Node (`node-sdk/`)

```bash
cd node-sdk
npm install
node registro.mjs                    # llega el correo a Mailpit: http://localhost:8026
node verificar.mjs <token-del-correo>
node login.mjs                       # login, lee los posts y cierra sesión
```

## 3. Con Next.js (`frontend/`)

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev                          # http://localhost:4321
```

- `lib/directus.js`: el cliente del SDK (solo `rest()`), usado en el servidor.
- `app/acciones.js`: acciones de servidor `registrar` (`registerUser`), `entrar` (`login` + cookie `httpOnly` de 15 min) y `salir`.
- `app/registro/page.js` y `app/login/page.js`: formularios con `useActionState`.
- `app/verificar/page.js`: recibe `?token=` del correo y llama a `registerUserVerify`.
- `app/posts/page.js`: lee la cookie y pide los posts con `withToken`; sin cookie, redirige a `/login`.

Es un ejemplo mínimo: el token no se renueva (al vencer, vuelves a iniciar sesión) y no hay validaciones ni estilos más allá de lo básico.
