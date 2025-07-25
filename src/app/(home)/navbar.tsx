import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchInput from './searchInput'
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-full w-full z-50'>
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href={'/'}>
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
        </Link>

        <h3 className="text-xl">
          Docs
        </h3>
      </div>

      <SearchInput />
      <div className="flex gap-3 items-center pl-2">
        <OrganizationSwitcher 
        afterCreateOrganizationUrl='/'
        afterLeaveOrganizationUrl='/'
        afterSelectOrganizationUrl='/'
        afterSelectPersonalUrl='/' 
        />
        <UserButton />

      </div>
     
    </nav>
  )
}

export default Navbar
