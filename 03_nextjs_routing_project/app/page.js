import Image from "next/image";

export default function Home() {
  return (
    <section className="text-slate-300 bg-slate-900 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-white">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed text-slate-400">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center gap-4">
            <button className="inline-flex text-white bg-indigo-600 border-0 py-2.5 px-6 focus:outline-none hover:bg-indigo-500 rounded-lg text-lg font-medium transition-all duration-200 shadow-lg shadow-indigo-600/30 active:scale-95">
              Button
            </button>
            <button className="inline-flex text-slate-300 bg-slate-800 border-0 py-2.5 px-6 focus:outline-none hover:bg-slate-700 hover:text-white rounded-lg text-lg font-medium transition-all duration-200 active:scale-95">
              Button
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded-xl shadow-2xl"
            alt="hero"
            src="https://dummyimage.com/720x600"
            width={720}
            height={600}
            priority
          />
        </div>
      </div>
    </section>
  );
}