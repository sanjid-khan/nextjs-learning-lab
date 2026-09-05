import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const articles = [
  {
    id: 1,
    category: "CATEGORY",
    title: "The Catalyzer",
    description: "Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.",
    image: "https://dummyimage.com/720x400",
    views: "1.2K",
    comments: 6,
    slug: "#"
  },
  {
    id: 2,
    category: "CATEGORY",
    title: "The 400 Blows",
    description: "Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.",
    image: "https://dummyimage.com/721x401",
    views: "1.2K",
    comments: 6,
    slug: "#"
  },
  {
    id: 3,
    category: "CATEGORY",
    title: "Shooting Stars",
    description: "Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.",
    image: "https://dummyimage.com/722x402",
    views: "1.2K",
    comments: 6,
    slug: "#"
  }
]

const Page = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font min-h-screen">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {articles.map((item) => (
            <div key={item.id} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden flex flex-col">
                <Image
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={item.image}
                  alt={item.title}
                  width={720}
                  height={400}
                />
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                      {item.category}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                      {item.title}
                    </h1>
                    <p className="leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center flex-wrap mt-auto">
                    <Link
                      href={item.slug}
                      className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 hover:text-indigo-300 transition-colors"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                    <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {item.views}
                    </span>
                    <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      {item.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page