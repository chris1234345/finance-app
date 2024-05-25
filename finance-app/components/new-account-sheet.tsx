import {Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { AccountForm } from './account-form'
import { insertAccountSchema } from '@/db/schema'
import { z } from 'zod'
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts'

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>;

export const NewAccontSheet = () => {
    const {isOpen, onClose} = useNewAccount();
    const mutation = useCreateAccount();

    const onSubmit = (values:FormValues) => {
        mutation.mutate(values);
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4 bg-white text-center flex justify-center'>
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions
                    </SheetDescription>
                <AccountForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: "",
                }}
                />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}