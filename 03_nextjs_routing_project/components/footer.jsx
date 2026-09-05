
import React from 'react'

const Footer = () => {
  return (
    <footer className="text-slate-400 bg-slate-900 border-t border-slate-800 body-font">
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Brand Column */}
        <div className="w-64 shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white cursor-pointer group">
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
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Building modern, performant web applications with seamless layout interfaces.
          </p>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {[1, 2, 3, 4].map((col) => (
            <div key={col} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-semibold text-white tracking-wider text-xs uppercase mb-4">
                Categories
              </h2>
              <nav className="list-none mb-10 space-y-2.5">
                <li>
                  <a className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-sm">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-sm">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-sm">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 cursor-pointer text-sm">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="bg-slate-950/60 border-t border-slate-800/60">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row items-center">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Tailblocks —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 ml-1 transition-colors"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer