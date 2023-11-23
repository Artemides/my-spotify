import { getSongsByTitle } from "@/actions/getSongsByTitle";
import Header from "@/components/Header";

type SearchProps = {
  searchParams: {
    title: string;
  };
};

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  return (
    <div>
      <Header>{/* <Search /> */}</Header>
    </div>
  );
};

export default Search;
