import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { file, content } = req.body;
    const filePath = path.join(process.cwd(), 'content', file);

    fs.writeFileSync(filePath, content, 'utf-8');

    return res.status(200).json({ message: 'Fichier mis à jour' });
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}