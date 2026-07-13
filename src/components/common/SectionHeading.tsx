interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-heading text-4xl font-bold">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}