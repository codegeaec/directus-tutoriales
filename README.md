# Directus en Español · código de los tutoriales

Código de la serie **Directus en Español** de [Codegea](https://codegea.com) en YouTube:
https://www.youtube.com/playlist?list=PLLlmPdMc4jxsCaY2riZYu8LkUHuHSPoyV

Cada carpeta corresponde a un video y funciona sola. Todo está probado con **Directus 12.5.1** (Docker).

| Parte | Video | Carpetas |
|---|---|---|
| 6 | [Correo: SMTP, Mailpit y plantillas propias](parte-06-correo) | `directus/` |

## Cómo se usa

Necesitas Docker. En la carpeta `directus/` de la parte que quieras:

```bash
docker compose up -d
```

- Directus: http://localhost:8056 (usuario `admin@example.com`, contraseña `directus`)
- Mailpit, la bandeja de prueba que recibe todos los correos: http://localhost:8026

Los puertos no son los habituales para no chocar con otros proyectos. Las credenciales y los correos son de ejemplo:
cámbialos antes de usar esto fuera de tu máquina (sobre todo `SECRET` y `ADMIN_PASSWORD`).

Las partes 1 a 5 se grabaron con Directus 11 y no tienen código aparte. Las siguientes partes se agregan a medida que se publican.

## Licencia

Código bajo licencia MIT (ver `LICENSE`). Directus y Mailpit son marcas de sus dueños.
