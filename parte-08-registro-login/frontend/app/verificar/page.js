import { Suspense } from 'react';
import { registerUserVerify } from '@directus/sdk';
import { directus } from '@/lib/directus';

export default function Verificar({ searchParams }) {
  return (
    <main>
      <Suspense fallback={<p>Confirmando…</p>}>
        <Confirmar searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

// El enlace del correo trae el token en la URL
async function Confirmar({ searchParams }) {
  const { token } = await searchParams;
  try {
    await directus.request(registerUserVerify(token));
  } catch {
    return <h1>El enlace no es válido o ya se usó</h1>;
  }
  return (
    <>
      <h1>Cuenta confirmada</h1>
      <a href="/login">Iniciar sesión</a>
    </>
  );
}
