import { ChangeEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import qs from "query-string";

import Input from "./Input";
import { useDebounce } from "@/hooks/useDebounce";

type SearchBarProps = {};
const SearchBar: React.FC<SearchBarProps> = ({}) => {
  const [search, setSearch] = useState("");
  const rounter = useRouter();

  const debauncedValue = useDebounce(search, 300);

  useEffect(() => {
    const query = {
      title: debauncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });
    rounter.push(url);
  }, [debauncedValue, rounter]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative min-w-[360px] flex-1">
      <span className="absolute inset-y-0 flex items-center px-3 text-neutral-400">
        <BiSearch size={21} />
      </span>
      <Input
        className="rounded-full pl-10  group-hover:ring-white group-hover:ring-2 ring-transparent  focus:ring-2 focus:ring-white hover:ring-[1px] hover:ring-neutral-400/50 bg-neutral-800"
        placeholder="What do you want to listen to?"
        value={search}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
