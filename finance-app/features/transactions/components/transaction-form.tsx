import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { insertCategorySchema, insertTransactionSchema } from '@/db/schema';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Select } from '@/components/select';
import { DatePicker } from '@/components/date-picker';
import { Textarea } from '@/components/ui/textarea';
// import { AmountInput } from '@/components/amount-input';
import { AmountInput } from '@/components/amoun-input';
import { convertAmountFromMiliunits } from '@/lib/utils';

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
    id: true,
});

type FormValues = z.infer<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string; value: string }[];
    categoryOptions: { label: string; value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateCategory,
    onCreateAccount,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount);
        const amountInMiliUnits = Math.round(amount * 100); // Convert to cents
        console.log({ values, amountInMiliUnits });
        onSubmit({
            ...values,
            amount: amountInMiliUnits,
        });
    };

    const handleDelete = () => {
        onDelete?.();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-10 pt-'>
                <FormField
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="accountId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account</FormLabel>
                            <FormControl>
                                <Select
                                    placeholder='Select an account'
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    placeholder='Select a category'
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="payee"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Payee</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder='Enter a payee'
                                    {...field}
                                    value={field.value || ""}
                                    className='rounded'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <AmountInput
                                    {...field}
                                    disabled={disabled}
                                    value={field.value || ""}
                                    placeholder='Enter an amount'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name="notes"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value ?? ""}
                                    placeholder='Enter notes'
                                    disabled={disabled}
                                    className='rounded'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className='w-full bg-black text-white rounded hover:text-black-bg-white hover:bg-black' disabled={disabled}>
                    {id ? "Save changes" : "Create Transaction"}
                </Button>
                {!!id && <Button type="button" disabled={disabled} onClick={handleDelete} className="w-full rounded " variant="outline">
                    <Trash className=' size-4 mr-2' />
                    Delete Transaction
                </Button>}
            </form>
        </Form>
    );
};
