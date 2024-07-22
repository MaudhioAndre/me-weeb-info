import { Link } from "react-router-dom";
import TruncateTitle from "../components/TruncateTitle";

export default function ListCharacter({ characterList }) {

  return (
    <>
      <section className="pb-16 bg-transparent">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white underline decoration-blue-400 underline-offset-4">
              Top Characters
            </h2>
            <Link
              to={"/all/characters"}
              className="px-4 py-2 text-sm font-medium text-white hover:text-white/80"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {characterList &&
              characterList.map((manga, index) => (
                <Link
                  to={`/characters/${manga.mal_id}`}
                  key={manga.mal_id}
                  className="relative overflow-hidden bg-transparent rounded-lg shadow-md"
                >
                  <img
                    src={manga.images.webp.image_url}
                    alt={manga.name}
                    className="object-cover object-center w-full lg:h-64 h-48"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-2 text-center text-white bg-black bg-opacity-80">
                    <h3 className="text-base font-semibold">
                      <span className="text-red-500">
                        {`${index < 9 ? "0" : ""}${index + 1}`}
                      </span>
                      {` ${TruncateTitle(manga.name, 14)}`}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
