import Link from 'next/link';

export default function AdminHome() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Panneau d’administration</h1>
      <Link href="/admin/dashboard">
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Accéder au Dashboard</button>
      </Link>
    </div>
  );
}
