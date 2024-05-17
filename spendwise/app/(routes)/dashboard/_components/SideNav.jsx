import React from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText,ShieldCheck } from 'lucide-react'
function SideNav() {
    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid
        },
        {
            id:2,
            name:'Dashboard',
            icon:PiggyBank
        },
        {
            id:3,
            name:'Dashboard',
            icon:ReceiptText
        },
        {
            id:4,
            name:'Dashboard',
            icon:ShieldCheck
        },

    ]
  return (
    <div className='h-screen p-5 border shadow-sm '>
    <Image src = {'/logo.svg'}
    alt='logo'
    width={120}
    height={60}
     />
    </div>
    
  )
}

export default SideNav