export const Tag = (props: { children: string }) => {
  return (
    <span className="text-xs border border-gray-300 rounded-md px-1 py-0.5">
      {props.children}
    </span>
  );
};
