import { ReactNode } from "react";

import Container from "@/components/common/Container";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/layout/Section";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageWrapperProps {
  children: ReactNode;

  title: string;
  description?: string;

  breadcrumb?: BreadcrumbItem[];

  className?: string;

  contentClassName?: string;

  background?:
    | "transparent"
    | "white"
    | "stone"
    | "primary"
    | "dark";

  spacing?:
    | "none"
    | "sm"
    | "md"
    | "lg"
    | "xl";
}

export default function PageWrapper({
  children,
  title,
  description,
  breadcrumb,

  className,
  contentClassName,

  background = "white",
  spacing = "lg",
}: PageWrapperProps) {
  return (
    <main className={className}>
      <PageHeader
        title={title}
        description={description}
        breadcrumb={breadcrumb}
      />

      <Section
        background={background}
        spacing={spacing}
      >
        <Container className={contentClassName}>
          {children}
        </Container>
      </Section>
    </main>
  );
}