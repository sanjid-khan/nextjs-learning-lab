import React from 'react'
import Link from 'next/link'

const TeamPage = () => {
  return (
    <div className="bg-emerald-500 text-white p-3 rounded-md font-bold shadow-sm">
      <Link href="/admin-dashboard/team-docs" className="hover:underline inline-block">
        👥 Team Page Component
      </Link>
    </div>
  )
}

export default TeamPage