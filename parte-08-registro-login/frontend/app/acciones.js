'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { registerUser, login } from '@directus/sdk';
import { directus } from '@/lib/directus';

export async function registrar(estado, form) {
  await directus.request(
    registerUser(form.get('email'), form.get('password'), {
      first_name: form.get('nombre'),
      verification_url: 'http://localhost:4321/verificar',
    }),
  );
  return 'Listo: revisa tu correo para confirmar la cuenta';
}

export async function entrar(estado, form) {
  try {
    const sesion = await directus.request(
      login({
        email: form.get('email'),
        password: form.get('password'),
      }),
    );
    // Cookie httpOnly: el JavaScript del navegador no la lee
    (await cookies()).set('token', sesion.access_token, {
      httpOnly: true,
      maxAge: sesion.expires / 1000,
    });
  } catch {
    return 'Correo o contraseña incorrectos';
  }
  redirect('/posts');
}

export async function salir() {
  (await cookies()).delete('token');
  redirect('/login');
}
