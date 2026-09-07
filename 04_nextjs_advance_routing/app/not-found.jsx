import React from 'react'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-slate-100">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-800/60 p-8 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
        
       
        <div className="space-y-2">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-500 via-purple-500 to-blue-500 animate-pulse">
            404
          </h1>
          <p className="text-2xl font-bold tracking-tight text-white">
            Page Not Found
          </p>
        </div>

      
        <p className="text-slate-400 text-sm leading-relaxed">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  )
}

export default NotFoundPage