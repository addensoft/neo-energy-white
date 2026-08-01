import { Heading, Paragraph } from "@/components/ui";

export type LegalSectionData = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/** One numbered clause: heading, body paragraphs, and an optional bullet list — the
 * one repeating shape both Privacy Policy and Terms of Use are built from. */
export function LegalSection({ index, section }: { index: number; section: LegalSectionData }) {
  return (
    <div className="flex flex-col gap-3">
      <Heading as="h2" size="h4" className="uppercase">
        {index + 1}. {section.heading}
      </Heading>
      {section.paragraphs.map((paragraph, paragraphIndex) => (
        <Paragraph key={paragraphIndex} size="body">
          {paragraph}
        </Paragraph>
      ))}
      {section.list && (
        <ul className="text-body flex flex-col gap-2 pl-5">
          {section.list.map((item, itemIndex) => (
            <li key={itemIndex} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
