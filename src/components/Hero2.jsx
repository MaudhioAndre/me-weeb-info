import { Link } from "react-router-dom";

export default function Hero2() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-top bg-no-repeat lg:h-full h-96"
      style={{
        backgroundImage: "url('https://radarbanyumas.disway.id/upload/6bbb8ca7129e647dc9cf26920e9e1e85.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      <div className="relative bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24 flex flex-col md:flex-row md:items-start md:justify-start items-center justify-center h-full">
        <div className="text-center md:text-start max-w-lg">
          <h2 className="mb-2">
            Featured Anime
          </h2>
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Koe no Katachi
          </h2>
          <p className="max-w-lg text-white/80 md:mt-6 md:block md:text-lg md:leading-relaxed">
            As a wild youth, elementary school student Shouya Ishida sought to
            beat boredom in the cruelest ways. When the deaf Shouko Nishimiya
            transfers into his class, Shouya and the rest of his class
            thoughtlessly bully her for fun. However, when her mother notifies
            the school...
          </p>
          <div className="mt-4 sm:mt-8">
            <Link to="/anime/28851">
              <button className="bg-gradient-to-r hover:scale-105 rounded-full from-red-900 to-blue-900 text-white font-semibold p-0.5">
                <span className="flex w-full bg-black text-white rounded-full p-3">
                  See Detail
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
