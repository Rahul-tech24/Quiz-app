import { ReactNode } from 'react';
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}