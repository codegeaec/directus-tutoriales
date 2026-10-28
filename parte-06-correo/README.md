# Parte 6 · Correo en Directus: SMTP, Mailpit y plantillas propias

Directus recién instalado no envía correos. Aquí se conecta a un SMTP (Mailpit, una bandeja de prueba local) y se usan
plantillas Liquid propias.

## Qué hay

- `directus/docker-compose.yml`: Directus 12.5.1 + Postgres + Mailpit, con las variables de correo
  (`EMAIL_TRANSPORT=smtp`, `EMAIL_SMTP_HOST=mailpit`, `EMAIL_SMTP_PORT=1025`, `EMAIL_FROM`, `EMAIL_TEMPLATES_PATH`).
- `directus/templates/`:
  - `codegea-base.liquid`: el diseño base (bloques `header`, `content`, `footer`).
  - `bienvenida.liquid`: correo de bienvenida para enviar desde un Flow (variables `nombre`, `items`, `boton_url`, `boton_texto`).
  - `password-reset.liquid`: reemplaza el correo de "recuperar contraseña" del sistema.

## Probarlo

```bash
cd directus
docker compose up -d
```

1. En http://localhost:8056/admin/login usa "¿Olvidaste tu contraseña?" con `admin@example.com`.
2. Abre Mailpit (http://localhost:8026): llega el correo con la plantilla `password-reset`.
3. Para la bienvenida: crea un Flow con la operación **Send Email**, tipo **Template**, plantilla `bienvenida`, y en **Data**
   pasa `nombre`, `items` y el botón.

Si agregas o cambias plantillas, reinicia Directus: `docker compose restart directus`.
