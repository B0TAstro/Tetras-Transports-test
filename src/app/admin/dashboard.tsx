import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Dashboard({ files }: { files: string[] }) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Gestion des pages MDX</h1>
      <ul className="mt-4">
        {files.map((file) => (
          <li key={file}>
            <Link href={`/admin/edit?file=${file}`} className="text-blue-600">
              ✏️ {file}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Récupère tous les fichiers MDX
export async function getServerSideProps() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));

  return { props: { files } };
}