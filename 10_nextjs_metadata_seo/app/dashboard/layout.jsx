import React from 'react'

export const metadata = {
  title:{
    default : "Dashboard Layout",
    template: "%s | Dashboard Layout"
  },
  description: "This is the dashboard layout of our nextjs application",
};

const DashboardLayout = ({children}) => {
  return (
    <div>
     <h1>Dashboard Layout</h1>
     {children}
    </div>
  )
}

export default DashboardLayout