"use client";

import qs from "query-string";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export const AccountFilter = () => {
    const {
        data: accounts,
        isLoading: isLoadingAccounts,
    } = useGetAccounts()

    return (
        <Select
        value=""
        onValueChange={() => {}}
        disabled={false}
        >
            <SelectTrigger
            className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
            >
                <SelectValue placeholder="Account">
                    <SelectItem value="all">
                        All accounts
                    </SelectItem>
                    {accounts?.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                            {account.name}
                        </SelectItem>
                    ))}
                </SelectValue>
            </SelectTrigger>
        </Select>
    )
}