"use client";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "w-full mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Container;
