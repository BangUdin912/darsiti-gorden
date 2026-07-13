interface Props {
  title: string;
  description: string;
}

export default function PageHeader({
  title,
  description,
}: Props) {
  return (
    <section className="py-16">
      <h1 className="font-heading text-5xl font-bold">
        {title}
      </h1>

      <p className="mt-3 text-muted-foreground">
        {description}
      </p>
    </section>
  );
}