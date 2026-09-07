import React from 'react'

const Adminlayout = ({ children, analytics, team }) => {
  return (
    <div className="grid grid-cols-2 gap-6 p-8 min-h-[80vh] bg-slate-50 font-sans">
      
    
      <div className="col-span-2 bg-red-50 border-2 border-red-500 rounded-xl p-6 min-h-45 shadow-md">
        <h3 className="text-lg font-bold text-red-800 mb-3">
          🏠 Main Page Slot ({'{children}'})
        </h3>
        {children}
      </div>

     
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-6 min-h-62.5 shadow-md">
        <h3 className="text-lg font-bold text-emerald-800 mb-3">
          👥 Team Parallel Slot ({'{team}'})
        </h3>
        {team}
      </div>

      
      <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6 min-h-62.5 shadow-md">
        <h3 className="text-lg font-bold text-blue-800 mb-3">
          📊 Analytics Parallel Slot ({'{analytics}'})
        </h3>
        {analytics}
      </div>

    </div>
  )
}

export default Adminlayout