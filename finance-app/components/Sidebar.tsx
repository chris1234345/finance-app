"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import { User, UsersRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const {user} = useUser();
    const pathname = usePathname();
  return (

    <div className='flex h-screen w-full font-inter'>
        
    <main className='sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='mb-12 cursor-pointer items-center gap-2 flex'> 
                <Image 
                src="/logo.svg"
                width={30}
                height={30}
                alt='FinanceEase logo'
                className='size-[24px] max-xl:size-14'
                />
                <h1 className='2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black max-xl:hidden'> FinanseEase</h1>
            </Link>
            {sidebarLinks.map((item) => {

                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                return (
                    <Link href={item.route} key={item.label}
                    className="text-black">
                        {item.label}
                    </Link>
                )
            })}
        </nav>
        <footer className='flex gap-4'>
        <UserButton afterSignOutUrl="/"/>
            <span style={{marginLeft: '10px', color: 'black'}}> {user ? user.emailAddresses[0].emailAddress : ''} </span>
        </footer>

        
    </main>

    <main className="flex-1 p-4">
        <div className="flex justify-between px-4">
        </div>
        <section>
          <h2 className="text-xl font-semibold">
            Welcome to FinanceEase <span>{user ? user.firstName : 'Guest'}</span>
          </h2>
          <p className="text-gray-600 mt-2">
            This is a simple finance app to help you manage your finances.
          </p>
        </section>
      </main>

    
            </div>
  )
}

export default Sidebar