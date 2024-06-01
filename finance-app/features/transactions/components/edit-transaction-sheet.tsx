import {Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { Loader2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm'
import { CategoryForm } from '../../categories/components/category-form'
import { useGetCategory } from '../../categories/api/use-get-category'
import { useEditCategory } from '../../categories/api/use-edit-category'
import { useDeleteCategory } from '../../categories/api/use-delete-category'

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet = () => {
    const {isOpen, onClose, id} = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure',
        "You are about to delete this category"
    )

    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = 
    editMutation.isPending ||
    deleteMutation.isPending;

    const isLoading = categoryQuery.isLoading;

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

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name,
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
                        Edit Category
                    </SheetTitle>
                    <SheetDescription>
                            Edit an existing category
                    </SheetDescription>
                   
                {isLoading 
                    ? (
                        <div className='absolute flex inset-0 items-center'>
                            <Loader2 className='size-4 text-muted-foreground animate-spin'/>
                        </div>
                    ) : (

                        <CategoryForm
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