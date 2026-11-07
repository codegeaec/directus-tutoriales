import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readItems, withToken } from '@directus/sdk';
import { directus } from '@/lib/directus';
import { salir } from '../acciones';

export default function Posts() {
  return (
    <main>
      <h1>Posts</h1>
      <Suspense fallback={<p>Cargando…</p>}>
        <Lista />
      </Suspense>
      <form action={salir}>
        <button>Cerrar sesión</button>
      </form>
    </main>
  );
}

async function Lista() {
  const token = (await cookies()).get('token')?.value;
  if (!token) redirect('/login');
  const posts = await directus.request(
    withToken(token, readItems('posts', {
      fields: ['id', 'titulo'],
    })),
  );
  return (
    <ul>
      {posts.map((p) => <li key={p.id}>{p.titulo}</li>)}
    </ul>
  );
}
