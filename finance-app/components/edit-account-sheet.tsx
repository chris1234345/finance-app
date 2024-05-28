import {Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { AccountForm } from './account-form'
import { insertAccountSchema } from '@/db/schema'
import { z } from 'zod'
import { useGetAccount } from '@/features/accounts/api/use-get-account'
import { useEditAccount } from '@/features/accounts/api/use-edit-accounts'
import { Loader2 } from 'lucide-react'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-accounts'
import { useConfirm } from '@/hooks/use-confirm'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>;

export const EditAccontSheet = () => {
    const {isOpen, onClose, id} = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure',
        "You are about to delete this transaction"
    )

    const accountQuery = useGetAccount(id);
    const editMutation = useEditAccount(id);
    const deleteMutation = useDeleteAccount(id);

    const isPending = 
    editMutation.isPending ||
    deleteMutation.isPending;

    const isLoading = accountQuery.isLoading;

    const onSubmit = (values:FormValues) => {
        editMutation.mutate(values,{
            onSuccess: () => {
                onClose();
            }
        });
    }

    const onDelete = async () => {
        const ok = await confirm();

        if(ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                }
            });
        }
    };

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name,
    } : {
        name: "",
    }
    

    return (
        <>
        <ConfirmDialog />
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4 bg-white text-center flex justify-center'>
                <SheetHeader>
                    <SheetTitle>
                        Edit Account
                    </SheetTitle>
                    <SheetDescription>
                            Edit an existing account
                    </SheetDescription>
                   
                {isLoading 
                    ? (
                        <div className='absolute flex inset-0 items-center'>
                            <Loader2 className='size-4 text-muted-foreground animate-spin'/>
                        </div>
                    ) : (

                        <AccountForm
                        id={id} 
                        onSubmit={onSubmit} 
                        disabled={isPending}
                        defaultValues={defaultValues}
                        onDelete={onDelete}
                        />
                    )
                }
                </SheetHeader>
            </SheetContent>
        </Sheet>
    </>
    )
}