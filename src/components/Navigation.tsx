import React from 'react';
import { Section } from '@/lib/markdown';

interface NavigationProps {
  sections: Section[];
}

const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const firstSection = sections.find((section) => section.order === 1);
  const firstSectionId = firstSection ? firstSection.id : '';
  const navSections = sections.filter((section) => section.showInNav);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto max-w-6xl">
        <nav className="flex justify-between items-center py-4 px-4">
          <a href={`#${firstSectionId}`} className="text-xl font-bold">
            <img src="/img/logo.webp" alt="Tetras Transports" className="h-10" />
          </a>

          <ul className="flex space-x-6">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {section.menu || section.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;