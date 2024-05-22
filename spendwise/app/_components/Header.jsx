"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className='p-5 flex justify-between items-center shadow-md'>
      <div className='flex items-center justify-between'>
        <Image src={'./logo.svg'}
          alt='logo'
          width={80}
          height={40}
        />

        {isSignedIn ?
          <div className='flex items-center gap-5'>
          <Link href = {'/dashboard'}>
          <Button variant="outline "> Dashboard</Button>
          </Link>
            <UserButton />
          </div> :
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>

        }
      </div>
    </div>
  )
}  

export default Header