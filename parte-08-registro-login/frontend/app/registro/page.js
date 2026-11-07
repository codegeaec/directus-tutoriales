'use client';
import { useActionState } from 'react';
import { registrar } from '../acciones';

export default function Registro() {
  const [mensaje, enviar, enviando] = useActionState(registrar, '');
  return (
    <form action={enviar}>
      <h1>Crea tu cuenta</h1>
      <input name="nombre" placeholder="Nombre" required />
      <input name="email" type="email"
        placeholder="Correo" required />
      <input name="password" type="password"
        placeholder="Contraseña" required />
      <button disabled={enviando}>Registrarme</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
