"use client";

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { Separator

 } from '@/components/ui/separator';

 import { cn } from '@/lib/utils';

export const SettingsCard = () => {
    const connectedBank = null;
    return (
        <Card className='border-none drop-shadow-sm bg-white rounded'>
            <CardHeader>
            <CardTitle className='text-xl rounded line-clamp-1'>
                Settings
            </CardTitle>
            </CardHeader>
            <CardContent>
                <Separator />
                <div className='fle flex-col gap-y-2 lg:flex-row items-center py-4'>
                    <p className='text-sm font-medium w-full lg:w-[16.5rem]'>
                        Bacnk Account
                    </p>
                    <div className='w-full items-center flex justify-between'>
                        <div className={cn(
                            "text-sm truncate flex items-center",
                            !connectedBank && "text-muted-foreground",
                        )}>
                                    {connectedBank
                                    ? "Bank account connected"
                                    : "No bank account connected"
                                    }
                        </div>
                        <Button className=' rounded p-4 text-white hover:text-white' variant="ghost">
                            Connect
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}