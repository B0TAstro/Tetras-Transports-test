import React from 'react';
import Image from 'next/image';
import { Section as SectionType } from '@/lib/markdown';

interface SectionProps {
  section: SectionType;
}

const Section: React.FC<SectionProps> = ({ section }) => {
  const contentWithImages = section.contentHtml.replace(
    /<img src="([^"]+)" alt="([^"]*)"\s*\/?>/g,
    (_, src, alt) =>
      `<Image src="${src}" alt="${alt}" width={800} height={400} layout="responsive" />`
  );

  return (
    <section id={section.id} className={`section-${section.id} py-16 px-4`}>
      <div className="container mx-auto max-w-4xl">
        <div dangerouslySetInnerHTML={{ __html: contentWithImages }} />
      </div>
    </section>
  );
};

export default Section;