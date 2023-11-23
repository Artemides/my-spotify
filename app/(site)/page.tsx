import { getSongs } from "@/actions/getSongs";
import Header from "@/components/Header";
import PageContent from "@/components/PageContent";
import Playlist from "@/components/Playlist";

export default async function Home() {
  const songs = await getSongs();

  return (
    <main className="h-full overflow-y-auto  bg-neutral-900 rounded-lg">
      <Header>
        <div className="p-4">
          <h3 className="font-semibold text-3xl my-6">Welcome Back</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:auto-cols-auto gap-y-3 gap-x-4 ">
            <Playlist
              href="liked"
              image={"/images/liked.png"}
              title="Sick Boy"
            />
            <Playlist
              href="electro"
              image={"/images/electro.jpeg"}
              title="Sick Boy"
            />
            <Playlist
              href="liked"
              image={"/images/liked.png"}
              title="Sick Boy"
            />
            <Playlist
              href="electro"
              image={"/images/electro.jpeg"}
              title="Sick BoyssssssBoysssssssBoysssssssBoysssssssBoyssssssss"
            />
          </div>
        </div>
      </Header>
      <div className="my-2 px-6">
        <div className="flex justify-center items-center ">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
    </main>
  );
}
