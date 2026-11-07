# Parte 7 · Usuarios, roles y permisos

Una política "Editor de posts" que crea, lee y edita posts pero no los borra, un rol Editor y una invitación por correo.

## Qué hay

- `directus/docker-compose.yml`: el mismo entorno de la parte 6 (Directus 12.5.1 + Postgres + Mailpit).
- `directus/schema.yaml`: la colección `posts` (`titulo`, `contenido`, `user_created`, `date_created`).
- `directus/templates/user-invitation.liquid`: el correo de invitación en español (además de las plantillas de la parte 6).

## Probarlo

```bash
cd directus
docker compose up -d
# crear la colección posts
docker compose cp schema.yaml directus:/tmp/schema.yaml
docker compose exec directus node cli.js schema apply --yes /tmp/schema.yaml
```

Los permisos se crean en el panel (Ajustes → Reglas de Acceso), como en el video:

1. Política **Editor de posts** con **Acceso a la aplicación**; en `posts`: crear, leer y actualizar en "Acceso total"; borrar, sin acceso.
2. Rol **Editor** con esa política.
3. Usuarios → Invitar usuarios → `ana@example.com` con el rol Editor. La invitación llega a Mailpit (http://localhost:8026).

## Límites del plan Core (Directus 12 sin licencia)

- Los permisos personalizados ("Personalizar uso": filtros como "solo sus propios posts", campos o validaciones) están
  bloqueados: Directus responde `RESOURCE_RESTRICTED`. Por colección y acción es todo o nada.
- 3 puestos: cada usuario con acceso a la aplicación ocupa uno, contando al administrador.
