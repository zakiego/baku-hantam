import { MinusIcon, PlusIcon } from "@/components/icon";

export const AddButton = ({
  href,
  children,
}: { href: string; children?: React.ReactNode }) => {
  return (
    <a
      href={href}
      className=" text-white text-xs mt-3 inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md bg-gray-900 hover:bg-gray-800"
    >
      <PlusIcon className="h-3 w-3" />
      <span className="ml-1">{children}</span>
    </a>
  );
};

export const DeleteButton = ({
  href,
  children,
}: { href: string; children?: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-xs mt-3 inline-flex items-center px-4 py-2 border border-red-500 font-medium rounded-md text-red-500 bg-white hover:bg-red-50"
    >
      <MinusIcon className="h-3 w-3" />
      <span className="ml-1">{children}</span>
    </a>
  );
};
