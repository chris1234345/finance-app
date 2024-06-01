import {Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { CategoryForm } from '../../categories/components/category-form'
import { useNewCategory } from '../../categories/hooks/use-new-category'
import { useCreateCategory } from '../../categories/api/use-create-category'
import { insertTransactionSchema } from '@/db/schema'
import { useNewTransaction } from '../hooks/use-new-tranzation'
import { useCreateTranzation } from '../api/use-create-transaction'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts'
import { TransactionForm } from './transaction-form'
import { Loader2 } from 'lucide-react'

const formSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
    const {isOpen, onClose} = useNewTransaction();
    const createMutation = useCreateTranzation();

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory()
    const onCreateCategory = (name: string) => categoryMutation.mutate({
        name
    })

    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
    }))


    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name: string) => accountMutation.mutate({
        name
    })

    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }))

    const isPending = createMutation.isPending || categoryMutation.isPending || accountMutation.isPending;

    const isLoading = categoryQuery.isLoading || accountQuery.isLoading;


    

    const onSubmit = (values:FormValues) => {
        createMutation.mutate(values,{
            onSuccess: () => {
                onClose();
            }
        });
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4 bg-white '>
                <SheetHeader>
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Add a new transaction
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                ? (
                    <div className='absulte inset-0 fle items-center justify-center'>
                        <Loader2 className='size-4 text-muted-foreground animate-spin'/>
                    </div>
                ) : (
                <TransactionForm
                onSubmit={onSubmit}
                disabled={isPending}
                categoryOptions={categoryOptions}
                onCreateCategory={onCreateCategory}
                accountOptions={accountOptions}
                onCreateAccount={onCreateAccount}
                />
                )
                }
                
            </SheetContent>
        </Sheet>
    )
}