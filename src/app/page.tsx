import React from 'react';
import { getAllSections } from '@/lib/markdown';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import Navigation from '@/components/Navigation';

export default async function Home() {
  const sections = await getAllSections();
  
  return (
    <main className="pt-16">
      <Navigation sections={sections} />
      
      {/* Sections de contenu */}
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
      
      {/* Formulaire de contact */}
    </main>
  );
}