"use client"

import { transactions as TransactionSchema } from '@/db/schema'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle

} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import{ columns} from './columns'
import { DataTable } from '@/components/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-tranzation'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useBulkDeleteTransaction } from '@/features/transactions/api/use-bulk-transactions'
import { UploadButton } from './upload-button'
import { ImportCard } from './import-card'
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account'
import { toast } from 'sonner'
import { useBulkCreateTransaction } from '@/features/transactions/api/use-bulk-create-transactions'
type Props = {
  children: React.ReactNode; 
}

enum VARIANTS {
  LIST = "LIST",
  IMPORT="IMPORT"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
}

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log({results})
    setImportResults(results);
    setVariant(VARIANTS.IMPORT)
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  }

  const newTransaction = useNewTransaction();
  const bulkCreateMutation = useBulkCreateTransaction();
  const deleteTransactions = useBulkDeleteTransaction()
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];
  

  const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

  const onSubmitImport = async (
    values: typeof TransactionSchema.$inferInsert[],
  ) => {
    const accountId = await confirm();
    if(!accountId) {
      return toast.error("Please select an account to continue")
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }))

    bulkCreateMutation.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      }
    });
  };

  if(transactionsQuery.isLoading) {
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
      <AccountDialog/>
      <ImportCard 
      data={importResults.data}
      onCancel={onCancelImport}
      onSumbit={onSubmitImport}
      />
      </>
    )
  }


  return (
    <div className="flex-1 relative">
   


    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-white rounded">
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
        Transaction history
          </CardTitle>
          <div className='flex flex-col lg:flex-row items-center gap-x-2 gap-y-2'>
          <Button onClick={newTransaction.onOpen} className='bg-black text-white rounded w-full lg:w-auto' size="sm">
            <Plus className='size-4 mr-2'/>
          Add new
          </Button>
          <UploadButton onUpload={onUpload}/>
          </div>
        </CardHeader>
        <CardContent>

        <DataTable 
        columns={columns} 
        data={transactions} 
        filterKey='payee'
        onDelete={(row) => {
          const ids = row.map((r) => r.original.id)
          deleteTransactions.mutate({ids});
        }}
        disabled={isDisabled}
        />
        </CardContent>
      </Card>
    </div>
</div>
  )
}

export default TransactionsPage