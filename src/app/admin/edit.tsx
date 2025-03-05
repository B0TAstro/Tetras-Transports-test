import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditPage({ file, content }: { file: string; content: string }) {
  const [mdxContent, setMdxContent] = useState(content);
  const router = useRouter();

  const saveFile = async () => {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, content: mdxContent }),
    });

    alert('Modifications enregistrées !');
    router.push('/admin/dashboard');
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Édition de {file}</h1>
      <textarea
        value={mdxContent}
        onChange={(e) => setMdxContent(e.target.value)}
        className="w-full h-96 p-2 border"
      />
      <button onClick={saveFile} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </div>
  );
}

// Récupérer le contenu du fichier sélectionné
import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ query }: any) {
  const { file } = query;
  const filePath = path.join(process.cwd(), 'content', file);
  const content = fs.readFileSync(filePath, 'utf-8');

  return { props: { file, content } };
}
