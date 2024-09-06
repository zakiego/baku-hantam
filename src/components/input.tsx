import { SearchIcon } from "@/components/icon";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchInput = ({ query, setQuery, ...props }: Props) => {
  return (
    <div className="group flex flex-row-reverse items-center gap-2 mt-4 mb-6 border border-slate-200 rounded-lg overflow-hidden has-[input:focus]:border-slate-400">
      <input
        type="text"
        className="p-2 w-full outline-transparent peer "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        {...props}
      />
      <SearchIcon className="block w-12 border-r border-r-slate-200 peer-focus:border-r-slate-800 stroke-slate-600 peer-focus:stroke-slate-800 " />
    </div>
  );
};
