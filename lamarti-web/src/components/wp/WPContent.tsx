interface WPContentProps {
  html: string;
  className?: string;
}

export default function WPContent({ html, className = "" }: WPContentProps) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:font-display prose-headings:text-marti-black prose-a:text-marti-blue prose-a:underline hover:prose-a:text-marti-orange prose-img:rounded-2xl prose-strong:text-marti-black ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
