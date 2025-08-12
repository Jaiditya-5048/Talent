
import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Task App' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Task Management</h1>
            <nav>
              <Link href="/" className="mr-4">Dashboard</Link>
              <Link href="/login" className="mr-4">Login</Link>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
