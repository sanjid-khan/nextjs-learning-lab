import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="text-slate-300 bg-slate-900 border-b border-slate-800 body-font shadow-lg">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo Section */}
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0 cursor-pointer group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-600 group-hover:bg-indigo-500 rounded-xl transition-all duration-300 shadow-md shadow-indigo-500/20"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-bold tracking-wide text-white group-hover:text-indigo-400 transition-colors">
            Tailblocks
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-medium">
          <Link href={"/"} className="mr-6 hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
            Home
          </Link>
          <Link href={"/about"} className="mr-6 hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
            About
          </Link>
          <Link href={"/user"}  className="mr-6 hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
            User
          </Link>
          <Link href={"/contact"}  className="mr-6 hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
           Contact
          </Link>
        </nav>

        {/* Action Button */}
        <button className="inline-flex items-center font-medium bg-indigo-600 hover:bg-indigo-500 text-white border-0 py-2 px-4 focus:outline-none rounded-lg text-sm mt-4 md:mt-0 transition-all duration-200 shadow-lg shadow-indigo-600/30 active:scale-95">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header