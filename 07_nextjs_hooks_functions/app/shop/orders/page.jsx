"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Order = () => {
  const router = useRouter();

  return (
    <div className="p-6 bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-emerald-400 mb-2">📦 Orders Page</h1>
        <p className="text-slate-300 text-sm">Manage and track your customer orders here.</p>
      </div>

      
      <div>
        <button
          onClick={() => router.push("/shop/products")}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-md active:scale-95 flex items-center gap-2"
        >
          Go to Products ➔
        </button>
      </div>
    </div>
  )
}

export default Order