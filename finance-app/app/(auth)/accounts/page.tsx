"use client"

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle

} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import {columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete'



const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts()
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];
  

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if(accountsQuery.isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton
            className='h-8 w-48'
            />
          </CardHeader>
          <CardContent>
            <div className='h-[500px] w-full flex items-center justify-center'>
              <Loader2 
              className='size-6 text-slate-300 animate-spin'
              />
            </div>
          </CardContent>
      </Card>
      </div>
    )
  }


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
        data={accounts} 
        filterKey='name'
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id)
          deleteAccounts.mutate({ids});
        }}
        disabled={isDisabled}
        />
        </CardContent>
      </Card>
    </div>
</div>
  )
}

export default AccountsPage