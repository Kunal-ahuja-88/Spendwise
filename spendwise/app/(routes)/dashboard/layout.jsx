import React from 'react'
import SideNav from './_components/SideNav'

function DashboardLayout({children}) {
  return (
    <div>
        <div className='fixed md:w-64  md-block '>
        <SideNav/>
    </div>
<div className='md:ml-64 bg-green-200'>
{children}
</div>
    </div>
    
  )
}

export default DashboardLayout