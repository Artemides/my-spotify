import { getSongsByTitle } from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchContent from "./components/SearchContent";

type SearchProps = {
  searchParams: {
    title: string;
  };
};

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header withSearch className="from-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold mt-5">Search</h1>
          <SearchContent songs={songs} />
        </div>
      </Header>
    </div>
  );
};

export default Search;
