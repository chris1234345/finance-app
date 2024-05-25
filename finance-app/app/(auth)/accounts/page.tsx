"use client"

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle

} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Payment, columns } from './columns'
import { DataTable } from '@/components/data-table'

const data: Payment[] =  [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
]

const page = () => {
  const newAccount = useNewAccount();
  return (
    <div className="flex-1 relative">
    <header className=" top-0 left-0 w-full h-2/5 bg-gradient-to-b from-green-700 to-green-500 px-4 py-8">
        <div className='max-w-screen-2xl mx-auto'>
            <div className='w-full flex items-center justify-between mb-14'>
                <div className='flex items-center lg:gap-x-16'>
                    {/* Add any additional content for the header here */}
                    <h1>Welcome back Chris</h1> 

                </div>
            </div>
        </div>
    </header>


    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-white rounded">
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
        Account page
          </CardTitle>
          <Button onClick={newAccount.onOpen} className='bg-black text-white rounded sm'>
            <Plus className='size-4 mr-2'/>
          Add new
          </Button>
        </CardHeader>
        <CardContent>

        <DataTable 
        columns={columns} 
        data={data} 
        filterKey='email'
        onDelete={() => {}}
        disabled={false}
        />
        </CardContent>
      </Card>
    </div>
</div>
  )
}

export default page