import './globals.css';

export const metadata = { title: 'Mi web' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
