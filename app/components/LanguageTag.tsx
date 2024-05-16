type LanguageTagProps = {
  name: string;
  color?: string | null;
};

export default function LanguageTag({ name, color }: LanguageTagProps) {
  return (
    <span className="flex items-center gap-1">
      <div
        data-testid="language-tag-color"
        role="presentation"
        className="size-3 rounded-full bg-blue"
        style={{
          backgroundColor: color ?? undefined,
        }}
      />
      {name}
    </span>
  );
}
