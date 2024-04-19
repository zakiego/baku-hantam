import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = (props: ContainerProps) => {
  return (
    <main
      className={clsx(
        props.className,
        "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 ",
      )}
    >
      <div className="mx-auto max-w-2xl">{props.children}</div>
    </main>
  );
};
