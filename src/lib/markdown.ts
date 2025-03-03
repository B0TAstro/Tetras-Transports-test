import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const sectionsDirectory = path.join(process.cwd(), 'content/sections');

// Structure d'une section
export interface Section {
  id: string;
  title: string;
  order: number;
  content: string;
  contentHtml: string;
}

// Récupérer toutes les sections
export async function getAllSections(): Promise<Section[]> {
  // Lire les noms de fichiers du répertoire sections
  const fileNames = fs.readdirSync(sectionsDirectory);
  
  // Récupérer les données de chaque section
  const allSectionsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Identifier l'ID de la section à partir du nom de fichier
      const id = fileName.replace(/\.md$/, '');
      
      // Lire le fichier Markdown
      const fullPath = path.join(sectionsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Utiliser gray-matter pour parser le contenu
      const matterResult = matter(fileContents);
      
      // Convertir le contenu Markdown en HTML
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();
      
      // Combiner les données
      return {
        id,
        contentHtml,
        content: matterResult.content,
        ...(matterResult.data as { title: string; order: number }),
      };
    })
  );
  
  // Trier les sections par ordre
  return allSectionsData.sort((a, b) => a.order - b.order);
}

// Récupérer une section spécifique
export async function getSection(id: string): Promise<Section> {
  const fullPath = path.join(sectionsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Utiliser gray-matter pour parser le contenu
  const matterResult = matter(fileContents);
  
  // Convertir le contenu Markdown en HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // Retourner les données de la section
  return {
    id,
    contentHtml,
    content: matterResult.content,
    ...(matterResult.data as { title: string; order: number }),
  };
}

// Mettre à jour une section
export async function updateSection(id: string, content: string, metadata: { title: string; order: number }): Promise<void> {
  const fullPath = path.join(sectionsDirectory, `${id}.md`);
  
  // Créer le contenu du fichier avec les métadonnées
  const fileContent = matter.stringify(content, metadata);
  
  // Écrire le contenu dans le fichier
  fs.writeFileSync(fullPath, fileContent);
}