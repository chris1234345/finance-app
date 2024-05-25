import {z} from 'zod'
import { Trash } from 'lucide-react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import { insertAccountSchema } from '@/db/schema'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'


const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>;
type Props = {
    id?:string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;  
    disabled?: boolean;
};

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });
    
    const handleSubmit = (values: FormValues) => {
       onSubmit(values);
    }

    const handleDelete = () => {    
        onDelete?.()
    }
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10 pt-'>
                <FormField 
                name="name"
                control={form.control}
                render={({field}) => (
                    <FormItem>

                    <FormLabel>
                        Name
                    </FormLabel>
                    <FormControl>
                        <Input 
                        disabled={disabled}
                        placeholder='e.g. Cash, Bank, Credit Card'
                        {...field}
                        className='mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button className='w-full bg-black text-white rounded hover:text-black-bg-white' disabled={disabled}>
                    {id ? "Save changes": "Create Account"}
                </Button>
                {!!id && <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full rounded " variant="outline">
                    <Trash className=' sie-4 mr-2' />
                    Delete account
                </Button> }
            </form>
    </Form>
)
}
