"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const Dashboard = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "analytics";

  return (
    <div className="p-6 bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700 space-y-6">
      
     
      <div>
        <h1 className="text-2xl font-bold text-blue-400 mb-1">📊 Dashboard Page</h1>
        <p className="text-slate-300 text-sm">Welcome to your shop overview and analytics.</p>
      </div>

     
      <div className="flex gap-3 border-b border-slate-700 pb-3">
        <Link
          href="?tab=analytics"
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            tab === "analytics"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Analytics
        </Link>

        <Link
          href="?tab=reports"
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            tab === "reports"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Reports
        </Link>
      </div>

      
      <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-700/50">
        {tab === "analytics" && (
          <div>
            <h2 className="text-lg font-semibold text-emerald-400 mb-1">📈 Analytics Content</h2>
            <p className="text-sm text-slate-400">Viewing real-time traffic and sales metrics.</p>
          </div>
        )}

        {tab === "reports" && (
          <div>
            <h2 className="text-lg font-semibold text-purple-400 mb-1">📋 Reports Content</h2>
            <p className="text-sm text-slate-400">Download and inspect detailed shop performance logs.</p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Dashboard