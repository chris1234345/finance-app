"use client"

import { useMount } from "react-use"
import { useState } from "react"
import {usePlaidLink} from "react-plaid-link"
import { Button } from "@/components/ui/button"
import { useCreateLinkToken } from "../api/use-create-link-token"
import { useExchangePubliToken } from "../api/use-exchange-pubic-token"
import { useDeleteConnectedBank } from "../api/use-delete-connected-bank"
import { useConfirm } from "@/hooks/use-confirm"

export const PlaidDisconnect = () => {

    const [Dialog, confirm] = useConfirm(
        "Are you sure ",
        "This will disconnect your bank account from our app",
    )

    const deleteConnectedBank = useDeleteConnectedBank()
    const exchangePublicToken = useExchangePubliToken()

    const onClick = async () => {
        const ok = await confirm()

        if(ok) {
            deleteConnectedBank.mutate()
        }
    }


    return (
        <>
        <Dialog />
        <Button
        onClick={onClick}
        disabled={deleteConnectedBank.isPending} className='rounded p-4 text-white hover:text-white' variant="ghost">
            Disconnect
        </Button>
            </>
    )
}