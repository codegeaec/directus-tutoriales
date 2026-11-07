'use client';
import { useActionState } from 'react';
import { entrar } from '../acciones';

export default function Login() {
  const [error, enviar, enviando] = useActionState(entrar, '');
  return (
    <form action={enviar}>
      <h1>Inicia sesión</h1>
      <input name="email" type="email"
        placeholder="Correo" required />
      <input name="password" type="password"
        placeholder="Contraseña" required />
      <button disabled={enviando}>Entrar</button>
      {error && <p>{error}</p>}
    </form>
  );
}
