import Header from '../components/header';
import './globals.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}
