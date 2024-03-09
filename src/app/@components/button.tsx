import clsx from "clsx";

export const AddButton = ({
  href,
  children,
}: { href: string; children?: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-xs mt-3 inline-flex items-center px-4 py-2 border border-balance font-medium rounded-md text-balance bg-white hover:bg-gray-50"
    >
      <PlusIcon className="h-3 w-3" />
      <span className="ml-1">{children}</span>
    </a>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={clsx("w-6 h-6", className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>
);
