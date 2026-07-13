interface Props {
  children: React.ReactNode;
}

export default function Badge({
  children,
}: Props) {
  return (
    <span className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
      {children}
    </span>
  );
}